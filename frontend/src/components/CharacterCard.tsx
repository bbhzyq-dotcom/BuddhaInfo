import { Card, Tag } from 'antd'
import type { Character } from '../types'

const categoryColors: Record<string, string> = {
  '佛': '#c41e3a',
  '菩萨': '#1e90ff',
  '罗汉': '#228b22',
  '护法': '#ff8c00',
  '其他': '#888888',
}

interface CharacterCardProps {
  character: Character
  onClick?: () => void
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <Card
      className="character-card"
      onClick={onClick}
      cover={
        <div
          style={{
            height: 140,
            background: `linear-gradient(135deg, ${categoryColors[character.category]}22 0%, ${categoryColors[character.category]}44 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
          }}
        >
          {character.category === '佛' ? '佛' : 
           character.category === '菩萨' ? '萨' : 
           character.category === '罗汉' ? '罗汉' : 
           character.category === '护法' ? '护' : '其他'}
        </div>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span className="character-name">{character.name}</span>
        <Tag color={categoryColors[character.category]} style={{ margin: 0 }}>
          {character.category}
        </Tag>
      </div>
      {character.sanskritName && (
        <div className="character-sanskrit">{character.sanskritName}</div>
      )}
      {character.otherNames && character.otherNames.length > 0 && (
        <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
          别名：{character.otherNames.slice(0, 3).join('、')}
        </div>
      )}
      <p className="character-summary">{character.summary}</p>
    </Card>
  )
}
