import ExperiencesContainer from '../components/Experiences/ExperiencesContainer'
import AddExperienceButton from '../components/Experiences/AddExperienceButton'

const Experiences = () => {
  return (
    <div className='flex flex-col justify-start items-center bg-gradient-to-br from-indigo-50 to-blue-100 h-full py-12 space-y-4'>
        <AddExperienceButton/>
        <ExperiencesContainer/>
    </div>
  )
}

export default Experiences