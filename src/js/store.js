export default class Store {
  set(name, arrData) {
    localStorage.setItem(name, JSON.stringify(arrData))
  }
  get(name) {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name))
    } else {
      return false
    }
  }
  clear(name) {
    localStorage.removeItem(name)
  }
  removeItems(name, arrData, status) {
    let newArr = []
    for (let i = 0; i < arrData.length; i++) {
      if (!(arrData[i].status == status)) {
        newArr.push(arrData[i])
      }
    }

    if (newArr[0]) {
      this.set(name, newArr)
    } else {
      this.clear(name)
    }
  }
  removeItem(name, arrData, id) {
    let newArr = []
    for (let i = 0; i < arrData.length; i++) {
      if (!(arrData[i].id == id)) {
        newArr.push(arrData[i])
      }
    }

    if (newArr[0]) {
      this.set(name, newArr)
      console.log(newArr)
    } else {
      this.clear(name)
    }
  }
}
