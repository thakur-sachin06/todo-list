import React from 'react';
import Content from './components/common/Content';
import Header from './components/common/Header';
import { ProjectsProvider, SelectedProjectsProvider } from './context';

const App = () => {
  return (
    <SelectedProjectsProvider>
      <ProjectsProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectsProvider>

  );
}

export default App;
