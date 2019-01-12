const respJSON = data => {
  return {
    err: data.err,
    msg: data.msg,
    data: data.data
  };
};

const respDefaultErrorJSON = () => {
  return {
    err: true,
    msg: "Server error!",
    data: {}
  };
};

module.exports = {
  respJSON,
  respDefaultErrorJSON
};
