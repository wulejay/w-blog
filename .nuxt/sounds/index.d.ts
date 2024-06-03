export type SoundsPaths = '/sounds/bubble.wav' | 
'/sounds/light-off.mp3' | 
'/sounds/light-on.mp3'

export interface AvailableSounds {
 "/sounds/bubble.wav": {
  /** @default "/sounds/bubble.wav" */
  src: string,

  /** @default 1 */
  volume: number,
  [key: string]: any
 },

 "/sounds/light-off.mp3": {
  /** @default "/sounds/light-off.mp3" */
  src: string,

  /** @default 1 */
  volume: number,
  [key: string]: any
 },

 "/sounds/light-on.mp3": {
  /** @default "/sounds/light-on.mp3" */
  src: string,

  /** @default 1 */
  volume: number,
  [key: string]: any
 },
 [key: string]: any
}