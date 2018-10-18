export const colors = {
  0: {
    name: 'Non-metals',
    colors: ['#ed3457', '#ee4464', '#f05371', '#f1637e', '#f3728b', '#f48298']
  },
  1: {
    name: 'Alkaline earths',
    colors: ['#f15932', '#f26642', '#f37352', '#f48062', '#f58c72', '#f69981']
  },
  2: {
    name: 'Transition metals',
    colors: ['#f9ac43', '#fab353', '#fabb64', '#fbc274', '#fbc985', '#fcd095']
  },
  3: {
    name: 'Basic metals',
    colors: ['#bdd746', '#c2da54', '#c7dd62', '#cce070', '#d1e37e', '#d6e68c']
  },
  4: {
    name: 'Halogens',
    colors: ['#46ba79', '#52bf82', '#5fc38b', '#6bc894', '#77cc9d', '#84d1a6']
  },
  5: {
    name: 'Noble gases',
    colors: ['#0eb89f', '#0fc8ad', '#10d8ba', '#12e7c8', '#1ceecf', '#2cefd2']
  },
  6: {
    name: 'Alkali metals',
    colors: ['#13aedc', '#15baeb', '#25bfec', '#34c3ee', '#44c8ef', '#54ccf0']
  },
  7: {
    name: 'Semi-metals',
    colors: ['#588eca', '#6597ce', '#729fd2', '#7fa8d6', '#8cb1da', '#98bade']
  },
  8: {
    name: 'Lanthanides',
    colors: ['#746eae', '#7e79b4', '#8984ba', '#938fc0', '#9e9ac6', '#a8a4cc']
  },
  9: {
    name: 'Actinides',
    colors: ['#a184a7', '#a98eae', '#b098b5', '#b8a2bc', '#bfacc3', '#c7b6ca']
  }
}

export default (type) => {
  return colors[type].colors
}
