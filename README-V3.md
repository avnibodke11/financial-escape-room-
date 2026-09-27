# Financial Escape Room — V3 Final Event Edition

This is the event-ready V3 build.

## Gameplay
1. Enter the escape room.
2. Read the mission.
3. Enter a player/team name.
4. Choose Easy, Medium, or Hard/Finance.
5. A single countdown starts for the entire run:
   - Easy: 2:00
   - Medium: 3:00
   - Hard/Finance: 4:00
6. Rooms 1–4 each contain a randomized finance challenge.
7. Correctly solving a room reveals one secret digit.
8. Each challenge allows up to 3 attempts.
9. A wrong answer never reveals the solution. After the third wrong attempt, that room fails and the run ends.
10. Hint 1 provides a method/strategy hint. Hint 2 provides the direct answer.
11. Room 5 is the final safe. Enter the four digits collected from Rooms 1–4.
12. The final safe allows up to 3 code attempts. If all fail, the run ends without revealing the code.
13. The final screen shows a session-only scoreboard. It is not connected to a shared Finplay leaderboard.
14. PLAY AGAIN resets the current session for the next player.

## Randomization
The question bank contains 24 questions for each difficulty. Four questions are chosen for a run with category variety and recent-question avoidance using local browser storage.

## Files
- index.html — main page
- data-v3.js — question bank
- game-v3.js — game logic
- style-v3.css — styling
- VERSION-V3.txt — version notes
