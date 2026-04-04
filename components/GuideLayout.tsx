import { ReactNode } from 'react';

interface GuideLayoutProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  vpnRequired: boolean;
  estimatedTime: string;
  children: ReactNode;
}

export default function GuideLayout({
  title,
  difficulty,
  vpnRequired,
  estimatedTime,
  children
}: GuideLayoutProps) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        
        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Difficulty:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">VPN Required:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${vpnRequired ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              {vpnRequired ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Estimated Time:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
              {estimatedTime}
            </span>
          </div>
        </div>

        {/* VPN Warning */}
        {vpnRequired && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">VPN Required</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>This method requires a VPN to access the service from the target country. We recommend using a reliable VPN service like NordVPN for best results.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        {children}
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Prices and availability may change. Always check the official service website for the most current information. 
          This guide is for educational purposes only.
        </p>
      </div>
    </div>
  );
}
