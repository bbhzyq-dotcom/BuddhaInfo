import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const contributionSchema = z.object({
  type: z.enum(['新增角色', '补充数据']),
  data: z.record(z.any()),
  submitterName: z.string().min(1),
  submitterEmail: z.string().email().optional().or(z.literal('')),
});

router.post('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;

  try {
    const parsed = contributionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid contribution data',
          details: parsed.error.flatten().fieldErrors,
        },
      });
    }

    const { type, data, submitterName, submitterEmail } = parsed.data;

    const contribution = await prisma.contribution.create({
      data: {
        type,
        data: JSON.stringify(data),
        submitterName,
        submitterEmail: submitterEmail || null,
        status: 'pending',
      },
    });

    res.json({
      success: true,
      message: 'Contribution submitted successfully, pending review',
      id: contribution.id,
    });
  } catch (error) {
    console.error('Error creating contribution:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to submit contribution' },
    });
  }
});

export default router;
