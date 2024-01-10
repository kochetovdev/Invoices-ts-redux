let nextId = 1;

export function idGenerator() {
  const newId = nextId;
  nextId += 1;
  return String(newId);
}