import React, { useState, useEffect } from 'react';
import { ResumeItem } from '../../types';
import { Download, Copy, RefreshCw } from 'lucide-react';

interface LatexRendererProps {
  items: ResumeItem[];
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ items }) => {
  const [latexCode, setLatexCode] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    generateLatex();
  }, [items]);

  const generateLatex = () => {
    setIsGenerating(true);
    
    // Basic LaTeX template
    let latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[left=0.75in,right=0.75in,top=0.6in,bottom=0.6in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{fontawesome}
\\usepackage{titlesec}

\\titleformat{\\section}{\\Large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{6pt}

\\begin{document}

\\begin{center}
  {\\LARGE \\textbf{Your Name}}\\\\
  youremail@example.com $\\cdot$ (123) 456-7890 $\\cdot$ Location $\\cdot$ \\href{https://linkedin.com/in/yourprofile}{linkedin.com/in/yourprofile}
\\end{center}

`;

    // Group items by type
    const experiences = items.filter(item => item.type === 'experience');
    const educations = items.filter(item => item.type === 'education');
    const skills = items.filter(item => item.type === 'skill');
    const projects = items.filter(item => item.type === 'project');
    const certifications = items.filter(item => item.type === 'certification');

    // Add Experience section
    if (experiences.length > 0) {
      latex += `\\section*{Experience}
`;
      experiences.forEach(item => {
        latex += `\\textbf{${escapeLatex(item.content.position)}} \\hfill ${escapeLatex(item.content.startDate)} - ${escapeLatex(item.content.endDate)}\\\\
\\textit{${escapeLatex(item.content.company)}}\\\\
${escapeLatex(item.content.description)}

`;
      });
    }

    // Add Education section
    if (educations.length > 0) {
      latex += `\\section*{Education}
`;
      educations.forEach(item => {
        latex += `\\textbf{${escapeLatex(item.content.institution)}} \\hfill ${escapeLatex(item.content.startDate)} - ${escapeLatex(item.content.endDate)}\\\\
${escapeLatex(item.content.degree)} in ${escapeLatex(item.content.field)}`;
        
        if (item.content.gpa) {
          latex += ` \\hfill GPA: ${escapeLatex(item.content.gpa)}`;
        }
        
        latex += `

`;
      });
    }

    // Add Skills section
    if (skills.length > 0) {
      latex += `\\section*{Skills}
\\begin{itemize}[leftmargin=*]
`;
      skills.forEach(item => {
        latex += `  \\item \\textbf{${escapeLatex(item.content.name)}}: ${capitalizeFirstLetter(escapeLatex(item.content.level))}
`;
      });
      latex += `\\end{itemize}

`;
    }

    // Add Projects section
    if (projects.length > 0) {
      latex += `\\section*{Projects}
`;
      projects.forEach(item => {
        latex += `\\textbf{${escapeLatex(item.content.name)}}`;
        
        if (item.content.link) {
          latex += ` \\hfill \\href{${escapeLatex(item.content.link)}}{Project Link}`;
        }
        
        latex += `\\\\
${escapeLatex(item.content.description)}\\\\
\\textit{Technologies}: ${escapeLatex(item.content.technologies.join(', '))}

`;
      });
    }

    // Add Certifications section
    if (certifications.length > 0) {
      latex += `\\section*{Certifications}
\\begin{itemize}[leftmargin=*]
`;
      certifications.forEach(item => {
        latex += `  \\item \\textbf{${escapeLatex(item.content.name)}} - ${escapeLatex(item.content.issuer)} (${escapeLatex(item.content.date)})`;
        
        if (item.content.link) {
          latex += ` \\href{${escapeLatex(item.content.link)}}{[Certificate]}`;
        }
        
        latex += `
`;
      });
      latex += `\\end{itemize}

`;
    }

    latex += `\\end{document}`;
    
    setLatexCode(latex);
    
    // In a real application, you would send this LaTeX code to a service that renders it
    // For this example, we'll just simulate a preview URL
    setTimeout(() => {
      setPreviewUrl('https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
      setIsGenerating(false);
    }, 1000);
  };

  const escapeLatex = (text: string): string => {
    if (!text) return '';
    
    // Replace LaTeX special characters with their escaped versions
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/~/g, '\\textasciitilde{}')
      .replace(/\^/g, '\\textasciicircum{}');
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    alert('LaTeX code copied to clipboard!');
  };

  const handleDownloadPdf = () => {
    // In a real application, this would download the actual PDF
    alert('In a real application, this would download the PDF');
  };

  return (
    <div className="h-full bg-white p-4 shadow-md rounded-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">LaTeX Renderer</h2>
        <div className="flex gap-2">
          <button 
            onClick={generateLatex}
            className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={handleCopyLatex}
            className="p-1.5 rounded-full hover:bg-green-100 text-green-600"
            title="Copy LaTeX code"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDownloadPdf}
            className="p-1.5 rounded-full hover:bg-purple-100 text-purple-600"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {isGenerating ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : previewUrl ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img 
              src={previewUrl} 
              alt="Resume Preview" 
              className="w-full object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-gray-500">No preview available</p>
          </div>
        )}
        
        <div>
          <h3 className="font-medium text-gray-700 mb-2">LaTeX Code</h3>
          <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto border border-gray-200">
            {latexCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LatexRenderer;