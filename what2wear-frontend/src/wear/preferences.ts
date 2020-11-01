export type ClothingRange = {
  /**
   * The type of clothing.
   */
  clothingType: string
  /**
   * Minimum temperature to wear this clothing, in celsius.
   */
  minTemp: number
}

export type RangePreferences<T extends string> = {
  name: T
  clothes: ClothingRange[]
}

export type WardrobePreference = {
  hat: RangePreferences<"hat">
  face: RangePreferences<"face">
  top: RangePreferences<"top">
  bottom: RangePreferences<"bottom">
  shoes: RangePreferences<"shoes">
}
