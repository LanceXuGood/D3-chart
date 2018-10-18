const cell = 64
const space = 5
const cellAndSpace = cell + space
export const types = [
  // row-1
  `H,Hydrogen,1,0,0,0`,
  `He,Helium,2, ${cellAndSpace * 17},0,5`,
  // row-2
  `Li,Lithium,3, 0,${cellAndSpace},6`,
  `Be,Beryllium,4, ${cellAndSpace},${cellAndSpace},1`,
  `B,Boron,5, ${cellAndSpace * 12},${cellAndSpace},7`,
  `C,Carbon,6, ${cellAndSpace * 13},${cellAndSpace},0`,
  `N,Nitrogen,7, ${cellAndSpace * 14},${cellAndSpace},0`,
  `O,Oxygen,8, ${cellAndSpace * 15},${cellAndSpace},0`,
  `F,Fluorine,9 ,${cellAndSpace * 16},${cellAndSpace},4`,
  `Ne,Neon,10, ${cellAndSpace * 17},${cellAndSpace},5`,
  // row-3
  `Na,Sodium,11, 0,${cellAndSpace * 2},6`,
  `Mg,Magnesium,12, ${cellAndSpace},${cellAndSpace * 2},1`,
  `Al,Aluminum,13, ${cellAndSpace * 12},${cellAndSpace * 2},3`,
  `Si,Sillicon,14, ${cellAndSpace * 13},${cellAndSpace * 2},7`,
  `P,Phosphorus,15, ${cellAndSpace * 14},${cellAndSpace * 2},0`,
  `S,Sulfur,16, ${cellAndSpace * 15},${cellAndSpace * 2},0`,
  `Cl,Chlorine,17, ${cellAndSpace * 16},${cellAndSpace * 2},4`,
  `Ar,Argon,18, ${cellAndSpace * 17},${cellAndSpace * 2},5`,
  // row-4
  `K,Potassium,19, 0,${cellAndSpace * 3},6`,
  `Ca,Calcium,20, ${cellAndSpace},${cellAndSpace * 3},1`,
  `Sc,Scandium,21, ${cellAndSpace * 2},${cellAndSpace * 3},2`,
  `Ti,Titanium,22, ${cellAndSpace * 3},${cellAndSpace * 3},2`,
  `V,Vanadium,23, ${cellAndSpace * 4},${cellAndSpace * 3},2`,
  `Cr,Chromium,24, ${cellAndSpace * 5},${cellAndSpace * 3},2`,
  `Mn,Manganese,25, ${cellAndSpace * 6},${cellAndSpace * 3},2`,
  `Fe,Iron,26, ${cellAndSpace * 7},${cellAndSpace * 3},2`,
  `Co,Cobalt,27, ${cellAndSpace * 8},${cellAndSpace * 3},2`,
  `Ni,Nickel,28, ${cellAndSpace * 9},${cellAndSpace * 3},2`,
  `Cu,Copper,29, ${cellAndSpace * 10},${cellAndSpace * 3},2`,
  `Zn,Zinc,30, ${cellAndSpace * 11},${cellAndSpace * 3},2`,
  `Ga,Gallium,31, ${cellAndSpace * 12},${cellAndSpace * 3},3`,
  `Ge,Germanium,32, ${cellAndSpace * 13},${cellAndSpace * 3},7`,
  `As,Arsenic,33, ${cellAndSpace * 14},${cellAndSpace * 3},7`,
  `Se,Selenium,34, ${cellAndSpace * 15},${cellAndSpace * 3},0`,
  `Br,Bromine,35, ${cellAndSpace * 16},${cellAndSpace * 3},4`,
  `Kr,Krypton,36, ${cellAndSpace * 17},${cellAndSpace * 3},5`,
  // row-5
  `Rb,Rubidium,37, 0,${cellAndSpace * 4},6`,
  `Sr,Strontium,38, ${cellAndSpace},${cellAndSpace * 4},1`,
  `Y,Yttrium,39, ${cellAndSpace * 2},${cellAndSpace * 4},2`,
  `Zr,Zirconium,40, ${cellAndSpace * 3},${cellAndSpace * 4},2`,
  `Nb,Niobium,41, ${cellAndSpace * 4},${cellAndSpace * 4},2`,
  `Mo,Molybdenum,42, ${cellAndSpace * 5},${cellAndSpace * 4},2`,
  `Tc,Technetium,43, ${cellAndSpace * 6},${cellAndSpace * 4},2`,
  `Ru,Ruthenium,44, ${cellAndSpace * 7},${cellAndSpace * 4},2`,
  `Rh,Rhodium,45, ${cellAndSpace * 8},${cellAndSpace * 4},2`,
  `Pd,Palladium,46, ${cellAndSpace * 9},${cellAndSpace * 4},2`,
  `Ag,Silver,47, ${cellAndSpace * 10},${cellAndSpace * 4},2`,
  `Cd,Cadmium,48, ${cellAndSpace * 11},${cellAndSpace * 4},2`,
  `In,Indium,49, ${cellAndSpace * 12},${cellAndSpace * 4},3`,
  `Sn,Tin,50, ${cellAndSpace * 13},${cellAndSpace * 4},3`,
  `Sb,Antimony,51, ${cellAndSpace * 14},${cellAndSpace * 4},7`,
  `Te,Tellurium,52, ${cellAndSpace * 15},${cellAndSpace * 4},7`,
  `I,Iodine,53, ${cellAndSpace * 16},${cellAndSpace * 4},4`,
  `Xe,Xenon,54, ${cellAndSpace * 17},${cellAndSpace * 4},5`,
  // row-6
  `Cs,Cesium,55, 0,${cellAndSpace * 5},6`,
  `Ba,Barium,56, ${cellAndSpace},${cellAndSpace * 5},1`,
  `Hf,Hafnium,72, ${cellAndSpace * 3},${cellAndSpace * 5},2`,
  `Ta,Tantalum,73, ${cellAndSpace * 4},${cellAndSpace * 5},2`,
  `W,Tungsten,74, ${cellAndSpace * 5},${cellAndSpace * 5},2`,
  `Re,Rhenium,75, ${cellAndSpace * 6},${cellAndSpace * 5},2`,
  `Os,Osmium,76, ${cellAndSpace * 7},${cellAndSpace * 5},2`,
  `Ir,Iridium,77, ${cellAndSpace * 8},${cellAndSpace * 5},2`,
  `Pt,Platinum,78, ${cellAndSpace * 9},${cellAndSpace * 5},2`,
  `Au,Gold,79, ${cellAndSpace * 10},${cellAndSpace * 5},2`,
  `Hg,Mercury,80, ${cellAndSpace * 11},${cellAndSpace * 5},2`,
  `Tl,Thallium,81, ${cellAndSpace * 12},${cellAndSpace * 5},3`,
  `Pb,Lead,82, ${cellAndSpace * 13},${cellAndSpace * 5},3`,
  `Bi,Bismuth,83, ${cellAndSpace * 14},${cellAndSpace * 5},3`,
  `Po,Polonium,84, ${cellAndSpace * 15},${cellAndSpace * 5},7`,
  `At,Astatine,85, ${cellAndSpace * 16},${cellAndSpace * 5},4`,
  `Rn,Radon,86, ${cellAndSpace * 17},${cellAndSpace * 5},5`,
  // row-7
  `Fr,Francium,87, 0,${cellAndSpace * 6},6`,
  `Ra,Radium,88, ${cellAndSpace},${cellAndSpace * 6},1`,
  `Rf,Rutherfordium,104, ${cellAndSpace * 3},${cellAndSpace * 6},2`,
  `Db,Dubnium,105, ${cellAndSpace * 4},${cellAndSpace * 6},2`,
  `Sg,Sesnorgium,106, ${cellAndSpace * 5},${cellAndSpace * 6},2`,
  `Bh,Bohrium,107, ${cellAndSpace * 6},${cellAndSpace * 6},2`,
  `Hs,Hassium,108, ${cellAndSpace * 7},${cellAndSpace * 6},2`,
  `Mt,Meltnerium,109, ${cellAndSpace * 8},${cellAndSpace * 6},2`,
  `Ds,Darmstadtium,110, ${cellAndSpace * 9},${cellAndSpace * 6},2`,
  `Rg,Roentgenium,111, ${cellAndSpace * 10},${cellAndSpace * 6},2`,
  `Cn,Copernicium,112, ${cellAndSpace * 11},${cellAndSpace * 6},2`,
  `Uut,Ununtrium,113, ${cellAndSpace * 12},${cellAndSpace * 6},3`,
  `Fl,Flerovium,114, ${cellAndSpace * 13},${cellAndSpace * 6},3`,
  `Uup,Ununpentium,115, ${cellAndSpace * 14},${cellAndSpace * 6},3`,
  `Lv,Livermorium,116, ${cellAndSpace * 15},${cellAndSpace * 6},3`,
  `Uus,Ununseptium,117, ${cellAndSpace * 16},${cellAndSpace * 6},4`,
  `Uuo,Ununoctium,118, ${cellAndSpace * 17},${cellAndSpace * 6},5`,
  // row-8
  `La,Lanthanum,57, ${cellAndSpace * 2},${cellAndSpace * 7 + cell / 2},8`,
  `Ce,Cerium,58, ${cellAndSpace * 3},${cellAndSpace * 7 + cell / 2},8`,
  `Pr,Praseodymium,59, ${cellAndSpace * 4},${cellAndSpace * 7 + cell / 2},8`,
  `Nd,Neodymium,60, ${cellAndSpace * 5},${cellAndSpace * 7 + cell / 2},8`,
  `Pm,Promethium,61, ${cellAndSpace * 6},${cellAndSpace * 7 + cell / 2},8`,
  `Sm,Samarium,62, ${cellAndSpace * 7},${cellAndSpace * 7 + cell / 2},8`,
  `Eu,Europium,63, ${cellAndSpace * 8},${cellAndSpace * 7 + cell / 2},8`,
  `Gd,Gadolinium,64, ${cellAndSpace * 9},${cellAndSpace * 7 + cell / 2},8`,
  `Tb,Terbium,65, ${cellAndSpace * 10},${cellAndSpace * 7 + cell / 2},8`,
  `Dy,Dysprosium,66, ${cellAndSpace * 11},${cellAndSpace * 7 + cell / 2},8`,
  `Ho,Holmium,67, ${cellAndSpace * 12},${cellAndSpace * 7 + cell / 2},8`,
  `Er,Erbium,68, ${cellAndSpace * 13},${cellAndSpace * 7 + cell / 2},8`,
  `Tm,Thulium,69, ${cellAndSpace * 14},${cellAndSpace * 7 + cell / 2},8`,
  `Yb,Ytterbium,70, ${cellAndSpace * 15},${cellAndSpace * 7 + cell / 2},8`,
  `Lu,Lutetium,71, ${cellAndSpace * 16},${cellAndSpace * 7 + cell / 2},8`,
  // row-9
  `Ac,Actinium,89, ${cellAndSpace * 2},${cellAndSpace * 8 + cell / 2},9`,
  `Th,Thorium,90, ${cellAndSpace * 3},${cellAndSpace * 8 + cell / 2},9`,
  `Pa,Protactinium,91, ${cellAndSpace * 4},${cellAndSpace * 8 + cell / 2},9`,
  `U,Uranium,92, ${cellAndSpace * 5},${cellAndSpace * 8 + cell / 2},9`,
  `Np,Neptunium,93, ${cellAndSpace * 6},${cellAndSpace * 8 + cell / 2},9`,
  `Pu,Plutonium,94, ${cellAndSpace * 7},${cellAndSpace * 8 + cell / 2},9`,
  `Am,Americium,95, ${cellAndSpace * 8},${cellAndSpace * 8 + cell / 2},9`,
  `Cm,Curium,96, ${cellAndSpace * 9},${cellAndSpace * 8 + cell / 2},9`,
  `Bk,Berkellum,97, ${cellAndSpace * 10},${cellAndSpace * 8 + cell / 2},9`,
  `Cf,Californium,98, ${cellAndSpace * 11},${cellAndSpace * 8 + cell / 2},9`,
  `Es,Einsteinium,99, ${cellAndSpace * 12},${cellAndSpace * 8 + cell / 2},9`,
  `Fm,Fermium,100, ${cellAndSpace * 13},${cellAndSpace * 8 + cell / 2},9`,
  `Md,Mendelevium,101, ${cellAndSpace * 14},${cellAndSpace * 8 + cell / 2},9`,
  `No,Nobelium,102, ${cellAndSpace * 15},${cellAndSpace * 8 + cell / 2},9`,
  `Lr,Lawrencium,103, ${cellAndSpace * 16},${cellAndSpace * 8 + cell / 2},9`
]

const findCount = (records, target) => {
  for (let i = 0, size = records.length; i < size; i++) {
    const { name, count, ...rest } = records[i]
    if (name.toUpperCase() === target.toUpperCase()) {
      return { count, ...rest }
    }
  }
  return {}
}

export const elements = (data) => {
  const states = types.map(value => {
    const [symbol, name, atomicnumber, x, y, type] = value.split(`,`)
    return { symbol, name, atomicnumber, x, y, type }
  })

  return states.map(state => {
    const { name } = state
    const { count, ...rest } = findCount(data, name)
    return { patentcount: count, ...state, ...rest }
  })
}
