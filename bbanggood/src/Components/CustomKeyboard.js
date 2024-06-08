import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import styled from "styled-components";
import "react-simple-keyboard/build/css/index.css";
import { koreanLayout } from "./koreanLayout";
import { englishLayout } from "./englishLayout";
import hangul from "hangul-js";

const CustomKeyboard = ({ text, setText, onEnterPress }) => {
  const [layoutName, setLayoutName] = useState("default");
  const [isKorean, setIsKorean] = useState(true);

  const onKeyPress = (key) => {
    if (key === "{pre}") {
      const res = text.slice(0, -1);
      setText(res);
    } else if (key === "{shift}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
    } else if (key === "{enterText}") {
      onEnterPress(); // 엔터 키가 눌렸을 때 콜백 함수 호출
    } else if (key === "{dot}") {
      setText((prev) => prev + ".");
    } else if (key === "{space}") {
      setText((prev) => prev + " ");
    } else if (key === "{en/ko}") {
      setIsKorean((prev) => !prev);
    } else {
      if (isKorean) {
        setText((prev) => hangul.assemble(hangul.disassemble(prev + key)));
      } else {
        setText((prev) => prev + key);
      }
    }
  };

  return (
    <KeyboardWrapper>
      <Keyboard
        layoutName={layoutName}
        layout={isKorean ? koreanLayout : englishLayout}
        onKeyPress={onKeyPress}
        display={{
          "{enterText}": "Enter",
          "{shift}": "↑",
          "{dot}": ".",
          "{space}": "space",
          "{pre}": "←",
          "{en/ko}": "En/Ko",
        }}
      />
    </KeyboardWrapper>
  );
};

const KeyboardWrapper = styled.div`
  width: 500px;
`;

export default CustomKeyboard;
