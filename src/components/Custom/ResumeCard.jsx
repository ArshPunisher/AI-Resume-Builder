import { Notebook } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ResumeCard({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
      <div className="flex flex-col items-start">
        <div className='mt-8 flex items-center justify-center bg-gray-100 w-[13rem] h-[17rem] rounded-lg border-2 border-indigo-600 cursor-pointer hover:shadow-lg shadow-indigo-600 hover:scale-105 transition-all'>
          <Notebook size={48} />
        </div>

        <div className="mt-2 w-52">
          <h2 className="text-lg font-semibold text-center">{resume.title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default ResumeCard;
