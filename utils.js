let respJSON = data => {
  return {
    err: data.err,
    msg: data.msg,
    data: data.data
  };
};

module.exports = {
  respJSON
};
