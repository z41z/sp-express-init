module.exports = {
  query: 'SELECT * FROM user',
  queryById: 'SELECT * FROM user WHERE id=?',
  update: 'UPDATE user SET name=?, age=? WHERE id=?',
  insert: 'INSERT INTO user(name, age) VALUES(?,?)',
  delete: 'DELETE FROM user WHERE id=?'
}