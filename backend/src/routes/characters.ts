import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { category, page = '1', pageSize = '12', sort = 'createdAt', order = 'desc' } = req.query;
  const pageNum = parseInt(page as string);
  const size = Math.min(parseInt(pageSize as string), 50);
  const skip = (pageNum - 1) * size;

  const where: any = { status: 'approved' };
  if (category) {
    where.category = category;
  }

  const orderBy: any = {};
  if (sort === 'name') {
    orderBy.name = order;
  } else {
    orderBy.createdAt = order;
  }

  try {
    const [characters, total] = await Promise.all([
      prisma.character.findMany({
        where,
        orderBy,
        skip,
        take: size,
      }),
      prisma.character.count({ where }),
    ]);

    res.json({
      success: true,
      data: characters.map(c => ({
        ...c,
        otherNames: c.otherNames ? JSON.parse(c.otherNames) : null,
      })),
      pagination: {
        page: pageNum,
        pageSize: size,
        total,
        totalPages: Math.ceil(total / size),
      },
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch characters' },
    });
  }
});

router.get('/categories', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;

  try {
    const categories = await prisma.character.groupBy({
      by: ['category'],
      where: { status: 'approved' },
      _count: { category: true },
    });

    res.json({
      success: true,
      data: categories.map(c => ({
        name: c.category,
        count: c._count.category,
      })),
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch categories' },
    });
  }
});

router.get('/hot', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const limit = Math.min(parseInt(req.query.limit as string) || 6, 20);

  try {
    const characters = await prisma.character.findMany({
      where: { status: 'approved', isHot: true },
      take: limit,
      orderBy: { updatedAt: 'desc' },
    });

    res.json({
      success: true,
      data: characters.map(c => ({
        ...c,
        otherNames: c.otherNames ? JSON.parse(c.otherNames) : null,
      })),
    });
  } catch (error) {
    console.error('Error fetching hot characters:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch hot characters' },
    });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { q, category } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Search query is required' },
    });
  }

  try {
    const where: any = {
      status: 'approved',
      OR: [
        { name: { contains: q as string } },
        { sanskritName: { contains: q as string } },
        { summary: { contains: q as string } },
      ],
    };
    if (category) {
      where.category = category;
    }

    const characters = await prisma.character.findMany({
      where,
      take: 50,
      orderBy: [
        { isHot: 'desc' },
        { name: 'asc' },
      ],
    });

    res.json({
      success: true,
      data: characters.map(c => ({
        ...c,
        otherNames: c.otherNames ? JSON.parse(c.otherNames) : null,
      })),
      total: characters.length,
    });
  } catch (error) {
    console.error('Error searching characters:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to search characters' },
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid character ID' },
    });
  }

  try {
    const character = await prisma.character.findUnique({
      where: { id },
      include: {
        contributions: {
          where: { status: 'approved' },
          select: { id: true, data: true },
        },
      },
    });

    if (!character || character.status !== 'approved') {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Character not found' },
      });
    }

    res.json({
      success: true,
      data: {
        ...character,
        otherNames: character.otherNames ? JSON.parse(character.otherNames) : null,
      },
    });
  } catch (error) {
    console.error('Error fetching character:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch character' },
    });
  }
});

export default router;
