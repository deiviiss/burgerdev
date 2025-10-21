'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { type ProductOption } from '@/lib/types'

interface ProductOptionsMultipleProps {
  options: ProductOption[]
  selectedOptionIds: string[]
  setSelectedOptionIds: React.Dispatch<React.SetStateAction<string[]>>
  title: string
}

export const ProductOptionsMultiple = ({
  options,
  selectedOptionIds,
  setSelectedOptionIds,
  title
}: ProductOptionsMultipleProps) => {
  const handleOptionToggle = (optionId: string) => {
    setSelectedOptionIds((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId)
      } else {
        return [...prev, optionId]
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-3">{title}</h4>
        <div className="space-y-1">
          {options?.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${selectedOptionIds.includes(option.id || '')
                ? 'bg-primary/5 border-primary'
                : 'bg-muted/30 border-border hover:bg-muted/50'
                }`}
            >
              <Checkbox
                id={`option-${option.id}`}
                checked={selectedOptionIds.includes(option.id || '')}
                onCheckedChange={() => { handleOptionToggle(option.id || '') }}
                disabled={!option.isAvailable}
              />
              <Label
                htmlFor={`option-${option.id}`}
                className={`flex-1 cursor-pointer ${!option.isAvailable ? 'text-muted-foreground line-through' : ''
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{option.name}</span>
                  <span className="text-muted-foreground">
                    {option.price > 0 ? `+$${option.price.toFixed(2)}` : ''}
                  </span>
                </div>
              </Label>
              {!option.isAvailable && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  No disponible
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
