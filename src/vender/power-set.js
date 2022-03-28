// 计算商品所有规格的排列组合
export default function bwPowerSet(originalSet) {
  const subSets = [];
  const numberOfCombinations = 2 ** originalSet.length;
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet = [];
    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex]);
      }
    }
    subSets.push(subSet);
  }
  return subSets;
}