package com.example.forms.core.resilience;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

/** Same provider-resilience contract as the archetype; demo wiring remains opt-in. */
public final class CircuitBreaker {
    public enum State { CLOSED, OPEN, HALF_OPEN }

    private final int failureThreshold;
    private final long openMillis;
    private final AtomicReference<State> state = new AtomicReference<>(State.CLOSED);
    private final AtomicInteger failures = new AtomicInteger();
    private final AtomicLong openedAt = new AtomicLong();

    public CircuitBreaker(int failureThreshold, long openMillis) {
        if (failureThreshold < 1 || openMillis < 1) throw new IllegalArgumentException("Thresholds must be positive");
        this.failureThreshold = failureThreshold;
        this.openMillis = openMillis;
    }

    public boolean allowRequest() {
        if (state.get() != State.OPEN) return true;
        if (System.currentTimeMillis() - openedAt.get() < openMillis) return false;
        return state.compareAndSet(State.OPEN, State.HALF_OPEN);
    }

    public void recordSuccess() { failures.set(0); state.set(State.CLOSED); }

    public void recordFailure() {
        if (failures.incrementAndGet() >= failureThreshold) {
            openedAt.set(System.currentTimeMillis());
            state.set(State.OPEN);
        }
    }

    public State getState() { return state.get(); }
}
