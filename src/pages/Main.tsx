import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

// 계산기 버튼 배열 정의
const buttons = [
  ["%", "CE", "C", "⌫"],
  ["1/x", "x²", "²√x", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["+/-", "0", ".", "="],
];

// 버튼 스타일 정의
const buttonStyle = {
  height: 48,
  fontSize: "1.2rem",
  borderRadius: 1,
  background: "#e0e0e0",
  color: "black",
  "&:hover": {
    background: "#bdbdbd",
  },
};

// 계산 함수
const calculate = (a: number, b: number, operator: string): number | string => {
  switch (operator) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    // 나누기 0으로 할 시 오류 처리
    case "÷":
      return b !== 0 ? a / b : "오류";
    default:
      return 0;
  }
};

const Main = () => {
  // 화면에 기본 표시 및 값 0
  const [display, setDisplay] = useState("0");
  // 연산하기전 현재 상태값 저장 및 업데이트
  const [operator, setOperator] = useState<string | null>(null);
  // 첫번째 값 (연산 전 값)
  const [firstValue, setFirstValue] = useState<number | null>(null);
  // 두번째 값 (연산 후 값)
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  // 연속 계산(마지막 연산자와 피연산자의) 값
  const [lastOperator, setLastOperator] = useState<string | null>(null);
  const [lastOperand, setLastOperand] = useState<number | null>(null);

  // 버튼 클릭 시 해당하는 함수 실행
  const handleClick = (value: string) => {
    // 숫자 및 소수점 입력
    if (!isNaN(Number(value)) || value === ".") {
      handleNumberInput(value);
    }
    // +, -, x, ÷ 연산
    else if (["+", "−", "×", "÷"].includes(value)) {
      handleOperatorInput(value);
    }
    // = 연산
    else if (value === "=") {
      handleEquals();
    }
    // 특수 연산
    else {
      handleSpecialOperations(value);
    }
  };

  // 숫자 및 소수점 입력 함수
  const handleNumberInput = (value: string) => {
    // 값 대기 상태일 경우
    if (waitingForOperand) {
      setDisplay(value === "." ? "0." : value);
      setWaitingForOperand(false);
    }
    // 값 대기 상태가 아닐 경우
    else {
      setDisplay((prev) =>
        prev === "0" && value !== "." ? value : prev + value
      );
    }
  };

  // +, -, x, ÷ 연산 함수
  const handleOperatorInput = (value: string) => {
    const currentValue = parseFloat(display);

    // 연산자가 있고, 첫번째 값이 있고, 값 대기 상태가 아닐 경우
    if (operator && firstValue !== null && !waitingForOperand) {
      const result = calculate(firstValue, currentValue, operator);
      setDisplay(String(result));
      setFirstValue(typeof result === "number" ? result : 0);
    }
    // 연산자가 없고, 첫번째 값이 없고, 값 대기 상태가 아닐 경우
    else {
      setFirstValue(currentValue);
    }

    // 연산자 저장
    setOperator(value);
    // 값 대기 상태 저장
    setWaitingForOperand(true);

    // 마지막 연산자, 피연산자 저장
    setLastOperator(value);
    setLastOperand(currentValue);
  };

  // = 연산 함수
  const handleEquals = () => {
    // 연산자가 있고, 첫번째 값이 있을 경우
    if (operator && firstValue !== null) {
      const secondValue = parseFloat(display);
      const result = calculate(firstValue, secondValue, operator);
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setLastOperator(operator);
      setLastOperand(secondValue);

      // 연산자가 없고, 마지막 연산자와 피연산자가 있을 경우
    } else if (lastOperator && lastOperand !== null) {
      const currentValue = parseFloat(display);
      // 연속 계산 ( 마지막 연산자와 피연산자)
      const result = calculate(currentValue, lastOperand, lastOperator);
      setDisplay(String(result)); // 결과값 표시
      setWaitingForOperand(true); // 값 대기 상태 저장
    }
  };

  const handleSpecialOperations = (value: string) => {
    switch (value) {
      // 값 초기화
      case "C":
      case "CE":
        setDisplay("0");
        setFirstValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        break;
      // 한개씩 지우기
      case "⌫":
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        break;
      // 부호 변경
      case "+/-":
        setDisplay((prev) =>
          prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev
        );
        break;
      // 퍼센트
      case "%":
        setDisplay((prev) => String(parseFloat(prev) / 100));
        break;
      // 1/x
      case "1/x":
        setDisplay((prev) =>
          parseFloat(prev) !== 0 ? String(1 / parseFloat(prev)) : "오류"
        );
        break;
      // 제곱
      case "x²":
        setDisplay((prev) => String(Math.pow(parseFloat(prev), 2)));
        break;
      // 제곱근
      case "²√x":
        setDisplay((prev) =>
          parseFloat(prev) >= 0 ? String(Math.sqrt(parseFloat(prev))) : "오류"
        );
        break;
    }
  };

  return (
    <Stack minHeight="100vh" justifyContent="center">
      {/*계산기 배경화면*/}
      <Box
        sx={{
          width: 320,
          margin: "40px auto",
          border: "1px solid #404040",
          borderRadius: 3,
          background: "#f9f9f9",
          padding: 2,
        }}
      >
        {/*계산기 화면*/}
        <Box
          sx={{
            height: 48,
            background: "#222",
            color: "#fff",
            fontSize: "2rem",
            textAlign: "right",
            padding: 1,
            borderRadius: 1,
            marginBottom: 1.5,
          }}
        >
          {display}
        </Box>
        {/*버튼 배열*/}
        <Stack
          flexWrap="wrap"
          gap={1.2}
          sx={{
            // 그리드형식 4개씩 배열
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {/* buttons 배열 구조를 가져와 순서대로 넣고 각 버튼에 대한 컴포넌트 생성
          btn -> 현재 눌린 버튼, idx -> 인덱스(몇번째 버튼인지)
          onClick -> 버튼 클릭 시 해당하는 함수 실행
          */}
          {buttons.flat().map((btn, idx) => (
            <Button
              key={idx}
              variant="contained"
              onClick={() => handleClick(btn)}
              sx={buttonStyle}
            >
              {btn}
            </Button>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Main;
