import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

type Props = {
  experience_id: number;
  companyName: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  bulletPoints?: string[];
};

const ExperienceCard = (props: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div
      className="relative bg-gray-50 w-full p-4 rounded shadow hover:bg-gray-100 transition"
      onClick={toggleExpand}
    >
      {/* Action Buttons */}
      <div
        className="absolute top-2 right-2 flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-gray-600 hover:text-gray-800" title="Edit">
          <Pencil size={18} />
        </button>
        <button className="text-gray-600 hover:text-gray-800" title="Delete">
          <Trash2 size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          title={expanded ? "Hide details" : "Show details"}
          onClick={toggleExpand}
        >
          {expanded ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Experience Info */}
      <h3 className="text-lg font-semibold">{props.companyName}</h3>
      {props.location && <p className="text-sm text-gray-600">{props.location}</p>}
      {props.startDate && (
        <p className="text-sm text-gray-500">
          {props.startDate} – {props.endDate || "Present"}
        </p>
      )}

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-2">
          {props.description && (
            <p className="text-sm italic">{props.description}</p>
          )}
          {props.bulletPoints?.length ? (
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              {props.bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 mt-2">No bullet points added.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
