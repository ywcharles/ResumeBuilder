import ExperienceCard from "./ExperienceCard";

const ExperiencesContainer = () => {
  return (
    <div
      className="bg-white w-[80%] flex flex-col rounded-md justify-start items-center p-5 space-y-2
  "
    >
      <ExperienceCard
        experience_id={1}
        companyName="URBN"
        description="Talent Analytics Co-op"
        location="Philadelphia"
        startDate="September 2024"
        endDate="March 2025"
        bulletPoints={[
          "Automated survey analysis with Python, reducing key term search time from 10 minutes to 3 minutes",
          "Improved query maintainability by refactoring 450+ hard-coded variables, reducing update time by 96%",
          "Resolved bugs in Cognos BI Employee Transfer Report, improving data accuracy by 177%",
          "Created quarterly trend reports for 11 executives, enhancing cross-departmental visibility",
        ]}
      />
      <ExperienceCard
        experience_id={1}
        companyName="URBN"
        description="Talent Analytics Co-op"
        location="Philadelphia"
        startDate="September 2024"
        endDate="March 2025"
        bulletPoints={[
          "Automated survey analysis with Python, reducing key term search time from 10 minutes to 3 minutes",
          "Improved query maintainability by refactoring 450+ hard-coded variables, reducing update time by 96%",
          "Resolved bugs in Cognos BI Employee Transfer Report, improving data accuracy by 177%",
          "Created quarterly trend reports for 11 executives, enhancing cross-departmental visibility",
        ]}
      />
    </div>
  );
};

export default ExperiencesContainer;
