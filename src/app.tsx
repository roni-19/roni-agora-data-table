import React from 'react';
import AgoraDatatable from "./componenets/agora-datatable";
import Header from "./componenets/header";
function App() {
  return (
      <div className={"flex flex-col justify-center p-4 bg-gray-100"}>
          <Header/>
          <div className="px-4">
            <AgoraDatatable/>
          </div>
    </div>
  );
}

export default App;
