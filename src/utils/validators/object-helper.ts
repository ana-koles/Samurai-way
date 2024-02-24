type Item = {
  id: string
  name: string
}

const updateObjectArray = (items: Item[], itemId: string, newObjectProp: {} ) => {
  return items.map(item => item.id === itemId ? {...item, ...newObjectProp} : item)
}