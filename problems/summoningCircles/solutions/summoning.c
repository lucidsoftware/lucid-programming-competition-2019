#include <stdio.h>
#include <stdlib.h>

// #define DEBUG

typedef struct stone {
  int val;
  struct stone* prev;
  struct stone* next;
} Stone;

#ifdef DEBUG
void display(int round, long S, Stone* highlight, Stone all[]) {
  fprintf(stderr, "[%2d] S=%2ld : ", round, S);
  int i = 0;
  while (all[i].val == -1) {
    i += 1;
  }
  Stone* first = &all[i];
  Stone* current = first;
  do {
    if (current == highlight) {
      fprintf(stderr, "(%2d)", current->val);
    } else {
      fprintf(stderr, " %2d ", current->val);
    }
    current = current->next;
  } while (current != first);
  fprintf(stderr, "\n");
}
#endif

Stone* rotate(Stone* from, int steps) {
  Stone* result = from;
  while (steps != 0) {
    if (steps > 0) {
      result = result->prev;
      steps -= 1;
    } else {
      result = result->next;
      steps += 1;
    }
  }
  return result;
}

Stone* removeStone(Stone* removing) {
  Stone* before = removing->prev;
  Stone* after = removing->next;
  before->next = after;
  after->prev = before;
  #ifdef DEBUG
  removing->val = -1;
  #endif
  return after;
}

Stone* insertAfter(Stone* inserted, Stone* before) {
  Stone* after = before->next;
  inserted->next = after;
  after->prev = inserted;
  inserted->prev = before;
  before->next = inserted;
  return inserted;
}

int main() {
  int P, K, M, Q;
  int S = 0;
  int _ignore = scanf("%d %d %d %d", &P, &K, &M, &Q);
  int n = 0;
  Stone* all = malloc(sizeof(Stone) * P);
  Stone* current = &all[n];
  current->val = n;
  current->prev = current;
  current->next = current;
  n += 1;
  while (n < P) {
    if (n % M == 0) {
      Stone* removing = rotate(current, Q);
      S += n + removing->val;
      current = removeStone(removing);
    } else {
      Stone* new = &all[n];
      new->val = n;
      current = insertAfter(new, rotate(current, -K));
    }
    #ifdef DEBUG
    display(n, S, current, all);
    #endif
    n += 1;
  }
  printf("%d\n", S);
}
