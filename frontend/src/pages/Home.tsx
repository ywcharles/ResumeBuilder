import Hero from "../components/Home/Hero";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <Hero />
    </div>
  );
};

export default Home;
