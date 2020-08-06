const ls = {
  get: (name, defaultValue) =>
    localStorage.getItem(`POLITEC_${name}`) || defaultValue,
  remove: name => localStorage.removeItem(`POLITEC_${name}`),
  set: (name, value) => localStorage.setItem(`POLITEC_${name}`, value),
}

export default ls
