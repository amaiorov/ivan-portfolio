export const getSrc = (file, size) => {
  const path = file.substr(0, file.lastIndexOf('/'));
  const filename = file.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
  const resized = path + '/resize/' + filename + '-' + size + '.jpg';
  // console.log(resized);
  return resized;
};
