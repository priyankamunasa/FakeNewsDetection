import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  text: string;
  prediction: 'Real' | 'Fake';
  confidence: number;
}

interface ResultsTableProps {
  results: NewsItem[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  currentPage,
  itemsPerPage,
  totalPages,
  onPageChange
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex, endIndex);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Detection Results</h3>
        <p className="text-sm text-gray-600 mt-1">
          Showing {startIndex + 1} to {Math.min(endIndex, results.length)} of {results.length} articles
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Article
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prediction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <React.Fragment key={item.id}>
                <tr className={`hover:bg-gray-50 transition-colors ${
                  item.prediction === 'Real' ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'
                }`}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {truncateText(item.title, 60)}
                    </div>
                    <div className="text-sm text-gray-500">ID: {item.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      {truncateText(item.text, 120)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {item.prediction === 'Real' ? (
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                      ) : (
                        <XCircle className="text-red-500 mr-2" size={16} />
                      )}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.prediction === 'Real' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.prediction}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.confidence > 0.8 
                              ? 'bg-green-500' 
                              : item.confidence > 0.6 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${item.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {(item.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRowExpansion(item.id)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
                {expandedRow === item.id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Full Title:</h4>
                          <p className="text-gray-700">{item.title}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Full Text:</h4>
                          <p className="text-gray-700 max-h-32 overflow-y-auto">{item.text}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                              Word Count: {item.text.split(' ').length}
                            </span>
                            <span className="text-sm text-gray-600">
                              Character Count: {item.text.length}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleRowExpansion(item.id)}
                            className="text-sm text-blue-600 hover:text-blue-900"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};