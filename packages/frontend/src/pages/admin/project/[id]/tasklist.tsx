import ProjectDetailsLayout from './Layout';
import ProjectTaskList from './overview/Tasklist';

function TaskList() {
  return (
    <ProjectDetailsLayout>
      <ProjectTaskList />
    </ProjectDetailsLayout>
  );
}

export default TaskList;
