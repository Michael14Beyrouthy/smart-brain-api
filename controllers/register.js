const handleRegister = (req, res ,db, bcrypt) => {
  console.log('here1');
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  console.log('here2');
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    console.log('here3');
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .insert({
          email: loginEmail[0].email,
          name: name,
          joined: new Date()
        })
        .returning('*')
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => {
    res.status(400).json(`${err}`);
    // console.log(err);
  });
}

module.exports = {
  handleRegister: handleRegister
}
