import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
const messagesFilePath = path.join(process.cwd(), 'src', 'data', 'messages.json');

// Ensure data files exist
function ensureFile(filePath, defaultData) {
  try {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring file:', filePath, err);
  }
}

export function getProjects() {
  ensureFile(projectsFilePath, []);
  try {
    const data = fs.readFileSync(projectsFilePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export function saveProjects(projects) {
  ensureFile(projectsFilePath, []);
  try {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving projects:', error);
    return false;
  }
}

export function getMessages() {
  ensureFile(messagesFilePath, []);
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading messages:', error);
    return [];
  }
}

export function saveMessages(messages) {
  ensureFile(messagesFilePath, []);
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving messages:', error);
    return false;
  }
}
