import type { GlobalThemeOverrides } from 'naive-ui';
import { cloneDeep } from 'lodash-es';
import { localStg, addColorAlpha, getColorPalette } from '@/utils';

const jsonSetting: Theme.Setting = {
  darkMode: false,
  followSystemTheme: true,
  layout: {
    minWidth: 900,
    mode: 'vertical'
  },
  themeColor: '#f4511e',
  otherColor: {
    info: '#096dd9',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  isCustomizeInfoColor: false,
  fixedHeaderAndTab: true,
  showReload: true,
  header: {
    inverted: false,
    height: 56,
    crumb: { visible: true, showIcon: false }
  },
  tab: {
    visible: true,
    height: 44,
    mode: 'chrome',
    isCache: true
  },
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64
  },
  menu: '',
  footer: {
    visible: false
  }
};

const themeSetting = jsonSetting as Theme.Setting;

/** 初始化主题配置 */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD;
  const storageSettings = localStg.get('themeSettings');
  if (isProd && storageSettings) {
    return storageSettings;
  }

  const themeColor = localStg.get('themeColor') || themeSetting.themeColor;
  const info = getColorPalette(themeColor, 7);
  const otherColor = { ...themeSetting.otherColor, info };
  const setting = cloneDeep({ ...themeSetting, themeColor, otherColor });
  return setting;
}

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error';
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type ColorKey = `${ColorType}Color${ColorScene}`;
type ThemeColor = Partial<Record<ColorKey, string>>;

interface ColorAction {
  scene: ColorScene;
  handler: (color: string) => string;
}

/** 获取主题颜色的各种场景对应的颜色 */
function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: color => getColorPalette(color, 7) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) }
  ];

  const themeColor: ThemeColor = {};

  colors.forEach(color => {
    colorActions.forEach(action => {
      const [colorType, colorValue] = color;
      const colorKey: ColorKey = `${colorType}Color${action.scene}`;
      themeColor[colorKey] = action.handler(colorValue);
    });
  });

  return themeColor;
}

/** 获取naive的主题颜色 */
export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
  const { primary, success, warning, error } = colors;

  const info = getColorPalette(primary, 7);

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error]
  ]);

  const colorLoading = primary;

  return {
    common: {
      ...themeColors
    },
    LoadingBar: {
      colorLoading
    }
  };
}
