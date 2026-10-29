import React, { useState, useEffect } from 'react';
import { soundManager } from '../../components/audio/soundEffects';
import { triggerConfetti, triggerPrideConfetti } from '../../components/common/Confetti';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Trophy,
  ChefHat
} from 'lucide-react';

export function FocusCookMode({ recipe, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = recipe?.instructions || [];
  const totalSteps = steps.length;

  // Step timer
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  // Parse suggested time from step text (e.g. "cook for 25 minutes")
  const parseStepTime = (text) => {
    if (!text) return 300;
    const match = text.match(/(\d+)\s*(?:-|to)?\s*(\d+)?\s*(?:mins?|minutes?)/i);
    if (match) {
      const minutes = parseInt(match[2] || match[1], 10);
      return minutes * 60;
    }
    return 300; // default 5 minutes
  };

  useEffect(() => {
    if (steps[currentStep]) {
      const parsed = parseStepTime(steps[currentStep]);
      setTimerSeconds(parsed);
      setTimerRunning(false);
    }
  }, [currentStep, recipe]);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      soundManager.play('success');
      triggerConfetti(50);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, totalSteps]);

  if (!recipe || totalSteps === 0) return null;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      soundManager.play('pop');
    } else {
      // Completed dish celebration!
      soundManager.play('success');
      triggerPrideConfetti();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      soundManager.play('pop');
    }
  };

  const isCompleted = currentStep === totalSteps - 1;
  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12, 16, 23, 0.98)',
        backdropFilter: 'blur(20px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        color: '#ffffff',
        padding: '2rem'
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto 1.5rem auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ChefHat size={24} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>{recipe.title}</h3>
            <span style={{ fontSize: '0.85rem', color: '#fed7aa' }}>Focus Cooking Mode</span>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Exit Focus Mode (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto 2.5rem auto',
          background: 'rgba(255, 255, 255, 0.15)',
          height: '6px',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f97316, #f59e0b)',
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {/* Main Step Center Card */}
      <div
        style={{
          flex: 1,
          maxWidth: '850px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(249, 115, 22, 0.2)',
            color: '#fdba74',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontWeight: '700',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            alignSelf: 'flex-start'
          }}
        >
          STEP {currentStep + 1} OF {totalSteps}
        </div>

        <p
          style={{
            fontSize: '1.85rem',
            lineHeight: '1.5',
            fontWeight: '600',
            color: '#f8fafc',
            marginBottom: '2.5rem'
          }}
        >
          {steps[currentStep]}
        </p>

        {/* Step Timer Controller */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '1.25rem 2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            alignSelf: 'flex-start',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step Timer
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'monospace', color: timerRunning ? '#f97316' : '#ffffff' }}>
              {formatTimer(timerSeconds)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                setTimerRunning(!timerRunning);
                soundManager.play('pop');
              }}
              style={{
                background: timerRunning ? '#ea580c' : '#f97316',
                border: 'none',
                color: '#fff',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {timerRunning ? <Pause size={16} /> : <Play size={16} />}
              <span>{timerRunning ? 'Pause' : 'Start Timer'}</span>
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(parseStepTime(steps[currentStep]));
                soundManager.play('pop');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                padding: '0.65rem',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              title="Reset Timer"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            padding: '0.85rem 1.5rem',
            borderRadius: '14px',
            fontWeight: '700',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ChevronLeft size={20} />
          <span>Previous Step (←)</span>
        </button>

        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
          Tip: Press <kbd style={{ background: '#334155', padding: '2px 6px', borderRadius: '4px' }}>Space</kbd> or <kbd style={{ background: '#334155', padding: '2px 6px', borderRadius: '4px' }}>→</kbd> to advance
        </span>

        <button
          onClick={handleNextStep}
          style={{
            background: isCompleted ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f97316, #ea580c)',
            border: 'none',
            color: '#fff',
            padding: '0.85rem 1.75rem',
            borderRadius: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 20px rgba(249, 115, 22, 0.4)'
          }}
        >
          <span>{isCompleted ? '🎉 Dish Finished! Celebrate!' : 'Next Step (→)'}</span>
          {isCompleted ? <Trophy size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
}
