package com.example.forms.core.resilience;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CircuitBreakerTest {
    @Test
    void opensAndRecovers() throws Exception {
        CircuitBreaker breaker = new CircuitBreaker(2, 100);
        breaker.recordFailure();
        breaker.recordFailure();
        assertEquals(CircuitBreaker.State.OPEN, breaker.getState());
        assertFalse(breaker.allowRequest());
        Thread.sleep(120);
        assertTrue(breaker.allowRequest());
        breaker.recordSuccess();
        assertEquals(CircuitBreaker.State.CLOSED, breaker.getState());
    }
}
