import Image from 'next/image';
import { ReactNode } from 'react';

interface Step {
  number: number;
  title: string;
  description: string | ReactNode;
  image?: string;
  imageCaption?: string;
  warning?: string;
}

interface EnhancedStepListProps {
  steps: Step[];
}

export default function EnhancedStepList({ steps }: EnhancedStepListProps) {
  return (
    <div className="space-y-8 my-8">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-4 items-start">
          {/* Step Number */}
          <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
            {step.number}
          </div>

          {/* Step Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {step.title}
            </h3>

            <div className="text-gray-700 leading-relaxed mb-4">
              {typeof step.description === 'string' ? (
                <p>{step.description}</p>
              ) : (
                step.description
              )}
            </div>

            {/* Step Image */}
            {step.image && (
              <div className="my-4">
                <Image
                  src={step.image}
                  alt={step.imageCaption || step.title}
                  width={800}
                  height={500}
                  className="rounded-lg border border-gray-200 w-full h-auto"
                />
                {step.imageCaption && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    {step.imageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Step Warning */}
            {step.warning && (
              <div className="mt-3 bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-900">
                <strong>Warning:</strong> {step.warning}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
