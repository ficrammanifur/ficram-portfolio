async function loadProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  try {
    const response = await fetch('/projects.json');
    const data = await response.json();
    const projects = data.projects || [];

    projectsGrid.innerHTML = '';

    projects.forEach((project) => {
      const projectItem = createProjectElement(project);
      projectsGrid.appendChild(projectItem);
    });
  } catch (err) {
    console.error('Error loading projects:', err);
    projectsGrid.innerHTML = '<p class="error">Failed to load projects</p>';
  }
}

function createProjectElement(project) {
  const article = document.createElement('article');
  article.className = 'project-item';

  const techStackHTML = project.tags
    .map((tag) => `<span class="tech">${tag}</span>`)
    .join('');

  let demoLink = '';
  if (project.demo_link) {
    demoLink = `<a href="${project.demo_link}" target="_blank" rel="noopener" class="project-demo">View Demo →</a>`;
  }

  article.innerHTML = `
    <div class="project-header">
      <h3>${project.title}</h3>
      <span class="project-type">${project.category}</span>
    </div>
    <p>${project.description}</p>
    <div class="tech-stack">
      ${techStackHTML}
    </div>
    <div class="project-links">
      <a href="${project.github_link}" target="_blank" rel="noopener" class="project-btn">View on GitHub →</a>
      ${demoLink}
    </div>
  `;

  return article;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProjects);
} else {
  loadProjects();
}
