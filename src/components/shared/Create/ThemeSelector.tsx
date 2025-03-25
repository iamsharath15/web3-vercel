'use client';

import React, { useState } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const themes = [
  { image: '/assets/image/solid.jpg', name: 'Solid', type: 'solid' },
  { image: '/assets/image/gradient.jpg', name: 'Gradient', type: 'gradient' },
];

const solidColors = [
  '#2a2e32',
  '#14370e',
  '#173613',
  '#4c1429',
  '#392147',
  '#2a2458',
  '#4d1716',
];
const gradientColors = [
  'linear-gradient(to right, #FF5733, #FF8D33)',
  'linear-gradient(to right, #6A11CB, #2575FC)',
  'linear-gradient(to right, #FF00FF, #800080)',
  'linear-gradient(to right, #FF4500, #FFD700)',
  'linear-gradient(to right, #4CAF50, #8BC34A)',
  'linear-gradient(to right, #00BCD4, #009688)',
];

interface ThemeSelectorProps {
  onChange: (theme: string, color: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedColor, setSelectedColor] = useState(solidColors[0]);

  const isGradient = selectedTheme.type === 'gradient';
  const colors = isGradient ? gradientColors : solidColors;

  const handleThemeChange = (theme: any) => {
    setSelectedTheme(theme);
    setSelectedColor(colors[0]);
    onChange(theme.name, colors[0]);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChange(selectedTheme.name, color);
  };

  return (
    <div className="w-full">
      {/* Theme Selector Button */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="flex items-center text-left hover:bg-white/50 text-white gap-2 px-4 h-auto py-2 w-full transition-all justify-start p-4% duration-300 rounded-md shadow-md  bg-white/30">
            <div className="flex ">
              <div className="flex items-center justify-center pr-4">
                <Image
                  src={selectedTheme.image}
                  alt={selectedTheme.name}
                  width={40}
                  height={40}
                  className={`rounded-sm `}
                />{' '}
              </div>
              <div className="flex flex-col">
                <h1 className="text-left"> Theme</h1>
                <h1>{selectedTheme.name}</h1>
              </div>
            </div>
          </Button>
        </DrawerTrigger>

        {/* Drawer Content */}
        <DrawerContent className="p-4 bg-black/30 border-none text-white rounded-t-lg">
          <DrawerHeader>
            <DrawerTitle>Select Theme</DrawerTitle>
          </DrawerHeader>

          {/* Theme Selection */}
          <div className="flex justify-start items-center gap-4 my-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className={`px-2 py-2 rounded-lg transition-all duration-200 `}
                onClick={() => handleThemeChange(theme)}
              >
                <div
                  className={`rounded-md p-1 mb-2  ${
                    selectedTheme.name === theme.name ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    width={70}
                    height={70}
                    className={`rounded-md `}
                  />
                </div>
                {theme.name}
              </button>
            ))}
          </div>

          {/* Color Picker */}
          <div className="mt-4  px-2">
            <h3 className="text-lg font-semibold mb-2">
              Select {isGradient ? 'Gradient' : 'Solid'} Color
            </h3>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-14 h-14 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-white scale-110'
                      : 'border-transparent'
                  }`}
                  style={{ background: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ThemeSelector;
