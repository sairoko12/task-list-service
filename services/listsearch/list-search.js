const search = (list, value) => {

    let startIndex  = 0,
        stopIndex   = list.length - 1,
        middle      = Math.floor((stopIndex + startIndex) / 2)

    while(list[middle] != value && startIndex < stopIndex) {
        if (value < list[middle]) {
            stopIndex = middle - 1
        } else if (value > list[middle]) {
            startIndex = middle + 1
        }

        middle = Math.floor((stopIndex + startIndex) / 2)
    }

    return (list[middle] != value) ? (value <= 0 ? 0 : list.splice((stopIndex + 1), middle, value)) : middle
}

module.exports = (list, target) => search(list.sort((a, b) => (a - b)), target)