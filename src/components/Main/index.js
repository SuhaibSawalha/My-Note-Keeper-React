import Notes from "./../Notes";

function Main({ searchText }) {
  return (
    <main>
      <Notes searchText={searchText} />
    </main>
  );
}

export default Main;
