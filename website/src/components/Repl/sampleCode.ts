export const sampleCode = `
  class Project {
    constructor(name) {
      this.name = name
    }
  };

  export class SwcProject extends Project {
    constructor(name, version) {
      super(name);
      this.version = '20210629';
    }

    showOff() {
      console.log('swc is a useful project')
    }
  }
`