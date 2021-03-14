declare module "*.css" { // 只要import以css为后缀的文件时，都会遵循以下规则
  const css : {[key: string]:string}
  export default css;
}