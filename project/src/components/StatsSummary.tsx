import React from 'react';
import { CheckCircle, XCircle, BarChart3, TrendingUp } from 'lucide-react';

interface StatsSummaryProps {
  totalArticles: number;
  realCount: number;
  fakeCount: number;
  averageConfidence: number;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  totalArticles,
  realCount,
  fakeCount,
  averageConfidence
}) => {
  const realPercentage = totalArticles > 0 ? (realCount / totalArticles) * 100 : 0;
  const fakePercentage = totalArticles > 0 ? (fakeCount / totalArticles) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 className="text-blue-600" />
          Analysis Summary
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp size={16} />
          <span>Processed {totalArticles} articles</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Articles</p>
              <p className="text-2xl font-bold text-blue-800">{totalArticles}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <BarChart3 className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Real News</p>
              <p className="text-2xl font-bold text-green-800">{realCount}</p>
              <p className="text-xs text-green-600">{realPercentage.toFixed(1)}%</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Fake News</p>
              <p className="text-2xl font-bold text-red-800">{fakeCount}</p>
              <p className="text-xs text-red-600">{fakePercentage.toFixed(1)}%</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <XCircle className="text-red-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-purple-800">{averageConfidence.toFixed(1)}%</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Distribution</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${realPercentage}%` }}
            ></div>
            <div 
              className="bg-red-500 h-full transition-all duration-500"
              style={{ width: `${fakePercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
            Real ({realCount})
          </span>
          <span className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
            Fake ({fakeCount})
          </span>
        </div>
      </div>
    </div>
  );
};