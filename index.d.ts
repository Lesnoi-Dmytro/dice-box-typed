/// <reference types="vite/client" />

declare module '@3d-dice/dice-box' {
  export default class DiceBox {
    constructor(options?: DiceBoxOptions);
    init(): Promise<void>;
    roll(dice: DiceRoll[], options?: RollOptions): Promise<DiceRollResult[]>;
    add(dice: DiceRoll[], options?: RollOptions): Promise<DiceRollResult[]>;
    updateConfig(options: Partial<DiceBoxOptions>): void;
    hide(className?: string): void;
    showResults(die: {id:number, value: number} & DiceRoll): void;
    config: DiceBoxOptions;
  }

  export interface WorldOnscreen {
    addNonDie(die: {
      id: number | string;
      value: number;
      sides: number;
      theme?: 'default' | 'rock' | 'rust' | 'smooth';
      themeColor?: string;
    }): void;
  }

  export interface RollOptions {
    theme?: string;
    newStartPoint?: boolean;
  }

  export interface DiceRoll {
    sides: number; // the type of die to be rolled. Either a number such as 20 or a die type such as "fate".
    qty?: number; // optional - the number of dice to be rolled. Defaults to 1
    modifier?: number; // optional - the modifier (positive or negative) to be added to the final results
    theme?: string; // optional - the theme's 'systemName' for this roll
    themeColor?: string; // optional - HEX value for the theme's material color
  }

  export interface DiceRollResult {
    groupId: number; // the roll group this die belongs to
    rollId: number; // the unique identifier for this die within the group
    sides: number; // the type of die
    theme: string; // the theme that was assigned to this die
    themeColor: string; // optional - HEX value for the theme's material color
    value: number; // the result for this die
  }

  export interface DiceRollResults {
    // the roll group object
    id: number; // the id of this group - should match the groupId of rolls
    mods: number[]; // the roll modifier
    qty: number; // the number of dice in this roll
    rolls: [
      // an array of Die Result Objects
      {
        groupId: number;
        result: number;
        rollId: number;
        sides: number;
        theme: string;
        themeColor: string;
      },
    ];
    sides: number; // the type of die used
    theme: string; // the theme for this group of dice
    themeColor: string; // the theme color for this group of dice
    value: number; // the sum of the dice roll results and modifier
  }

  export interface DiceBoxOptions {
    id?: string; // The ID of the canvas element.
    assetPath: string; // The path to static assets needed by this module. *required
    container?: Element | string | null; //	A query selector for the DOM element to place the dice box canvas in.
    gravity?: number; //Too much gravity will cause the dice to jitter. Too little and they take much longer to settle.
    mass?: number; //	The mass of the dice. Affects how forces act on the dice such as spin
    friction?: number; //	The friction of the dice and the surface they roll on
    restitution?: number; //	The bounciness of the dice
    angularDamping?: number; //	Determines how quickly the dice lose their spin (angular momentum)
    linearDamping?: number; //	Determines how quickly the dice lose their linear momentum
    spinForce?: number; //	The maximum amount of spin the dice may have
    throwForce?: number; //	The maximum amount of throwing force used
    startingHeight?: number; //	The height at which the toss begins
    settleTimeout?: number; //	Time in ms before a die is stopped from moving
    offscreen?: boolean; // If offscreenCanvas is available it will be used
    delay?: number; // The delay between dice being generate. If they're all generated at the same time they instantly collide with each other which doesn't look very natural.
    lightIntensity?: number; // Global illumination levels
    enableShadows?: boolean; // Do the dice cast a shadow? Turn off for a performance bump
    shadowTransparency?: number; //	Set the transparency of the shadows cast by the dice
    theme?: 'default' | 'rock' | 'rust' | 'smooth'; //	For additional themes see @3d-dice/dice-themes
    preloadThemes?: string[]; // An array of themes to pre-load. Useful for themes that extend other themes.
    externalThemes?: { [key: string]: string }; //	An object with theme system names as the key value and an external url path to theme assets. Useful for accessing themes on a CDN.
    themeColor?: string; //	Some themes allow for a configurable base color as a HEX value
    scale?: number; //	Options are best between 2-9. The higher the number the larger the dice. Accepts decimal numbers
    suspendSimulation?: boolean; // Turn off the 3D simulation and use the built-in random number generator instead.
    origin?: string; // Sets the site origin used for constructing paths to assets.
    onBeforeRoll?: () => void; // callback function triggered after notation has been parsed, but before the roll starts
    onDieComplete?: () => void; // callback function triggered whenever an individual die has completed rolling
    onRollComplete?: () => void; // function	callback function triggered whenever all the dice have completed rolling
    onRemoveComplete?: () => void; // callback function triggered whenever a die has been removed from the scene
    onThemeConfigLoaded?: () => void; // callback function triggered after a theme config file has been successfully fetched and parsed
    onThemeLoaded?: (theme: DiceBoxTheme) => void; // callback function triggered after a theme has finished loading all related assets
  }

  export interface DiceBoxTheme {
    author: string; // The author of the theme
    basePath: string; // The base path for the theme assets
    diceAvailable: string[]; // An array of available dice types
    material: {
      type: string; // The type of material used for the theme
      diffuseTexture: string; // The path to the diffuse texture file
      diffuseLevel: number; // The level of the diffuse texture
      bumpTexture: string; // The path to the bump texture file
      bumpLevel: number; // The level of the bump texture
    };
    meshFile: string; // The path to the mesh file
    meshFilePath: string; // The path to the mesh file
    meshName: string; // The name of the mesh file
    name: string; // The name of the theme
    systemName: string; // The system name of the theme
    theme: 'default' | 'rock' | 'rust' | 'smooth'; // The theme name
    version: number; // The version of the theme
  }
}
