// author:marthel
export default function setFiletype(file: File | null) {
  if (!file) {
    return ''
  }
  if (file.type === 'image/jpeg') {
    return '.jpg'
  }
  return '.png'
}
