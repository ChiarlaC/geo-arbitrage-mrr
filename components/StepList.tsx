interface Step {
  number: number;
  title: string;
  description: string;
  estimatedTime: string;
  important?: boolean;
}

interface StepListProps {
  steps: Step[];
}

export default function StepList({ steps }: StepListProps) {
  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <div key={step.number} className="relative">
          {/* Step number */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-bold text-lg">
                {step.number}
              </div>
            </div>
            
            {/* Step content */}
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <span className="text-sm text-gray-500">{step.estimatedTime}</span>
              </div>
              
              <p className="mt-2 text-gray-600">{step.description}</p>
              
              {/* Important note */}
              {step.important && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> This step is crucial for the process to work correctly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Connecting line (except for last step) */}
          {step.number < steps.length && (
            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-300 -translate-y-8"></div>
          )}
        </div>
      ))}
    </div>
  );
}
