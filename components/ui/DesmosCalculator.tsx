import React, { useEffect, useRef } from 'react';
import Desmos from 'desmos';

interface Expression {
  id?: string;
  latex?: string;
  color?: string;
  hidden?: boolean;
  [key: string]: any;
}

interface DesmosCalculatorProps {
  expressions?: Expression[];
}

const DesmosCalculator: React.FC<DesmosCalculatorProps> = ({ expressions }) => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calculatorRef.current) return;

    const calculator = Desmos.GraphingCalculator(calculatorRef.current);

    if (expressions) {
      // Clear existing expressions before setting new ones
      calculator.setBlank();

      // Set each expression from the props
      expressions.forEach((expression) => {
        calculator.setExpression(expression);
      });
    }

    return () => calculator.destroy();
  }, [expressions]);

  return <div ref={calculatorRef} style={{ width: '100%', height: '500px' }} />;
};

export default DesmosCalculator;