import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumChapter } from './types';

export const GRADE_7_CHAPTERS_6_TO_10: CurriculumChapter[] = [
  chapter(7, 6, 'Proportions and Proportional Quantities', 'Tỉ lệ thức và đại lượng tỉ lệ', [
    lesson(
      7, 6, 20,
      'Proportions',
      'Tỉ lệ thức',
      ['Define a proportion $\\frac{a}{b} = \\frac{c}{d}$ ($a:b = c:d$) and name extremes and means.', 'Use the cross-product property $ad = bc$ to solve for unknown terms.'],
      ['Nêu định nghĩa tỉ lệ thức và gọi tên ngoại tỉ, trung tỉ.', 'Vận dụng tính chất $ad = bc$ để tìm số chưa biết.'],
      [
        v('g7l20-v1', 'proportion', 'n', 'tỉ lệ thức', 'An equality of two ratios $\\frac{a}{b} = \\frac{c}{d}$ ($b, d \\ne 0$).', 'Đẳng thức của hai tỉ số $\\frac{a}{b} = \\frac{c}{d}$.', 'Check if $3:4$ and $6:8$ form a proportion.', 'Kiểm tra xem $3:4$ và $6:8$ có lập thành tỉ lệ thức không.'),
        v('g7l20-v2', 'extremes / means', 'n', 'ngoại tỉ / trung tỉ', 'In $a:b = c:d$, $a, d$ are extremes and $b, c$ are means; the product of extremes equals the product of means.', 'Trong $a:b = c:d$, $a, d$ là ngoại tỉ, $b, c$ là trung tỉ; tích ngoại tỉ bằng tích trung tỉ.', 'Cross-multiplying gives $a \\cdot d = b \\cdot c$.', 'Nhân chéo cho ta $a \\cdot d = b \\cdot c$.'),
      ],
      [
        n('g7l20-n1', '\\frac{a}{b} = \\frac{c}{d} \\Rightarrow a \\cdot d = b \\cdot c', 'if a over b equals c over d, then a times d equals b times c', 'nếu a phần b bằng c phần d thì a nhân d bằng b nhân c'),
      ],
      [
        e('g7l20-e1', 'describe', 'From any equality $a \\cdot d = b \\cdot c$ of nonzero numbers, we can form four distinct proportions.', 'Từ đẳng thức $a \\cdot d = b \\cdot c$ với các số khác $0$, ta lập được $4$ tỉ lệ thức.'),
        e('g7l20-e2', 'question', 'How do we find $x$ in $\\frac{x}{6} = \\frac{-5}{15}$?', 'Ta tìm $x$ trong tỉ lệ thức $\\frac{x}{6} = \\frac{-5}{15}$ như thế nào?'),
        e('g7l20-e3', 'present', 'By the cross-product property, $15x = 6 \\cdot (-5) = -30$, so $x = -2$.', 'Áp dụng tính chất tỉ lệ thức, $15x = -30 \\Rightarrow x = -2$.'),
      ],
      [
        ex(
          'g7l20-ex1',
          'Solving a proportion',
          'Tìm x từ tỉ lệ thức',
          'Solve $\\frac{x - 1}{4} = \\frac{3}{2}$.',
          'Tìm $x$ biết $\\frac{x - 1}{4} = \\frac{3}{2}$.',
          [
            s('Step 1: Cross-multiply', 'Bước 1: Nhân chéo', '$2(x - 1) = 4 \\cdot 3 = 12$.', '$2(x - 1) = 4 \\cdot 3 = 12$.'),
            s('Step 2: Solve for $x$', 'Bước 2: Giải tìm $x$', '$x - 1 = 6 \\Rightarrow x = 7$.', '$x - 1 = 6 \\Rightarrow x = 7$.'),
          ],
          'Therefore, $x = 7$.',
          'Vậy $x = 7$.'
        ),
      ],
      ['Phân biệt `ratio` (tỉ số $\\frac{a}{b}$) và `proportion` (tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$).']
    ),
    lesson(
      7, 6, 21,
      'Properties of Sequences of Equivalent Ratios',
      'Tính chất của dãy tỉ số bằng nhau',
      ['Apply $\\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d} = \\frac{a-c}{b-d}$ with nonzero denominators.', 'Translate word problems with "in the ratio of $2:3:5$" into equivalent ratios.'],
      ['Áp dụng tính chất dãy tỉ số bằng nhau $\\frac{x}{a} = \\frac{y}{b} = \\frac{x+y}{a+b}$.', 'Chuyển đổi bài toán chia theo tỉ lệ sang dãy tỉ số bằng nhau.'],
      [
        v('g7l21-v1', 'sequence of equivalent ratios', 'n phr', 'dãy tỉ số bằng nhau', 'An equality chaining three or more ratios: $\\frac{x}{a} = \\frac{y}{b} = \\frac{z}{c}$.', 'Chuỗi đẳng thức gồm nhiều tỉ số bằng nhau.', 'Using the property of equivalent ratios, add numerators and denominators.', 'Áp dụng tính chất dãy tỉ số bằng nhau, cộng các tử và cộng các mẫu tương ứng.'),
        v('g7l21-v2', 'proportional to $a, b, c$', 'adj phr', 'tỉ lệ với $a, b, c$', 'Indicates $x : y : z = a : b : c$, or $\\frac{x}{a} = \\frac{y}{b} = \\frac{z}{c}$.', 'Diễn đạt $x, y, z$ lần lượt tỉ lệ thuận với $a, b, c$.', 'Three numbers are proportional to $3, 4, 5$.', 'Ba số tỉ lệ với $3; 4; 5$.'),
      ],
      [
        n('g7l21-n1', '\\frac{x}{a} = \\frac{y}{b} = \\frac{x+y}{a+b} = \\frac{x-y}{a-b}', 'x over a equals y over b equals x plus y over a plus b', 'x phần a bằng y phần b bằng x cộng y phần a cộng b'),
      ],
      [
        e('g7l21-e1', 'describe', 'Always check that the resulting denominator ($a + b$ or $a - b$) is not zero.', 'Luôn chú ý điều kiện các mẫu số cộng trừ lại phải khác $0$.'),
        e('g7l21-e2', 'question', 'How should we multiply the numerator and denominator when the equation contains $2x - y$?', 'Khi đề cho $2x - y$, ta cần biến đổi tỉ số $\\frac{x}{a}$ như thế nào?'),
        e('g7l21-e3', 'present', 'Applying the property of equivalent ratios, $\\frac{x}{3} = \\frac{y}{5} = \\frac{x + y}{3 + 5} = \\frac{32}{8} = 4$.', 'Áp dụng tính chất dãy tỉ số bằng nhau, $\\frac{x}{3} = \\frac{y}{5} = \\frac{32}{8} = 4$.'),
      ],
      [
        ex(
          'g7l21-ex1',
          'Solving a ratio word problem',
          'Giải bài toán bằng dãy tỉ số bằng nhau',
          'Two numbers $x, y$ satisfy $\\frac{x}{4} = \\frac{y}{7}$ and $y - x = 15$. Find $x$ and $y$.',
          'Tìm hai số $x, y$ biết $\\frac{x}{4} = \\frac{y}{7}$ và $y - x = 15$.',
          [
            s('Step 1: Apply equivalent ratios', 'Bước 1: Áp dụng dãy tỉ số bằng nhau', '$\\frac{x}{4} = \\frac{y}{7} = \\frac{y - x}{7 - 4} = \\frac{15}{3} = 5$.', '$\\frac{x}{4} = \\frac{y}{7} = \\frac{y - x}{7 - 4} = \\frac{15}{3} = 5$.'),
            s('Step 2: Recover $x$ and $y$', 'Bước 2: Tìm $x$ và $y$', '$x = 4 \\cdot 5 = 20$ and $y = 7 \\cdot 5 = 35$.', '$x = 4 \\cdot 5 = 20$ và $y = 7 \\cdot 5 = 35$.'),
          ],
          'So $x = 20$ and $y = 35$.',
          'Vậy $x = 20$ và $y = 35$.'
        ),
      ],
      ['Có thể hướng dẫn thêm cách đặt $k$: $\\frac{x}{4} = \\frac{y}{7} = k \\Rightarrow x = 4k, y = 7k$, rất phổ biến trong sách tiếng Anh.']
    ),
    lesson(
      7, 6, 22,
      'Directly Proportional Quantities',
      'Đại lượng tỉ lệ thuận',
      ['Define direct proportion $y = kx$ ($k \\ne 0$) and identify the constant of proportionality.', 'Use constant ratios $\\frac{y_1}{x_1} = \\frac{y_2}{x_2}$ to solve real-world problems.'],
      ['Nêu định nghĩa đại lượng tỉ lệ thuận $y = kx$ ($k \\ne 0$) và tìm hệ số tỉ lệ.', 'Áp dụng tỉ số bằng nhau để giải toán chia phần tỉ lệ thuận.'],
      [
        v('g7l22-v1', 'directly proportional', 'adj phr', 'tỉ lệ thuận', 'If $y = kx$ ($k \\ne 0$), then $y$ is directly proportional to $x$.', 'Nếu $y = kx$ ($k \\ne 0$) thì $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$.', 'Distance traveled at constant speed is directly proportional to time.', 'Quãng đường đi với vận tốc không đổi tỉ lệ thuận với thời gian.'),
        v('g7l22-v2', 'constant of proportionality', 'n phr', 'hệ số tỉ lệ', 'The nonzero constant $k = \\frac{y}{x}$ relating two directly proportional quantities.', 'Hằng số khác $0$ là $k = \\frac{y}{x}$.', 'Find the constant of proportionality $k$ given $x = 3, y = 12$.', 'Tìm hệ số tỉ lệ $k$ khi $x = 3, y = 12$.'),
      ],
      [
        n('g7l22-n1', 'y = kx \\;(k \\ne 0) \\Rightarrow \\frac{y_1}{x_1} = \\frac{y_2}{x_2}', 'y equals k times x implies y one over x one equals y two over x two', 'y bằng k nhân x suy ra tỉ số hai giá trị tương ứng luôn bằng nhau'),
      ],
      [
        e('g7l22-e1', 'describe', 'If $y$ is directly proportional to $x$ with constant $k$, then $x$ is directly proportional to $y$ with constant $\\frac{1}{k}$.', 'Nếu $y$ tỉ lệ thuận với $x$ theo hệ số $k$ thì $x$ tỉ lệ thuận với $y$ theo hệ số $\\frac{1}{k}$.'),
        e('g7l22-e2', 'question', 'When $x$ doubles, what happens to $y$ if $y$ is directly proportional to $x$?', 'Khi $x$ tăng gấp đôi thì $y$ thay đổi như thế nào nếu $y$ tỉ lệ thuận với $x$?'),
        e('g7l22-e3', 'present', 'Because mass is directly proportional to volume, $\\frac{m_1}{V_1} = \\frac{m_2}{V_2}$.', 'Vì khối lượng tỉ lệ thuận với thể tích nên $\\frac{m_1}{V_1} = \\frac{m_2}{V_2}$.'),
      ],
      [
        ex(
          'g7l22-ex1',
          'Direct proportion formula and values',
          'Tìm hệ số tỉ lệ thuận và tính giá trị',
          'Given $y$ is directly proportional to $x$, and $y = -18$ when $x = 6$. Write $y$ in terms of $x$ and find $y$ when $x = -5$.',
          'Biết $y$ tỉ lệ thuận với $x$ và khi $x = 6$ thì $y = -18$. Biểu diễn $y$ theo $x$ và tính $y$ khi $x = -5$.',
          [
            s('Step 1: Find constant $k$', 'Bước 1: Tìm hệ số tỉ lệ $k$', '$k = \\frac{y}{x} = \\frac{-18}{6} = -3$, so $y = -3x$.', '$k = \\frac{-18}{6} = -3$, suy ra $y = -3x$.'),
            s('Step 2: Substitute $x = -5$', 'Bước 2: Thay $x = -5$', '$y = -3 \\cdot (-5) = 15$.', '$y = -3 \\cdot (-5) = 15$.'),
          ],
          'Formula is $y = -3x$; when $x = -5$, $y = 15$.',
          'Công thức là $y = -3x$; khi $x = -5$ thì $y = 15$.'
        ),
      ],
      ['Chú ý phân biệt hệ số tỉ lệ của $y$ đối với $x$ ($k$) với của $x$ đối với $y$ ($1/k$).']
    ),
    lesson(
      7, 6, 23,
      'Inversely Proportional Quantities',
      'Đại lượng tỉ lệ nghịch',
      ['Define inverse proportion $y = \\frac{a}{x}$ ($xy = a \\ne 0$).', 'Apply constant products $x_1 y_1 = x_2 y_2$ to speed–time and worker–days problems.'],
      ['Nêu định nghĩa đại lượng tỉ lệ nghịch $y = \\frac{a}{x}$ ($xy = a \\ne 0$).', 'Vận dụng tính chất tích không đổi $x_1 y_1 = x_2 y_2$ giải toán thực tế.'],
      [
        v('g7l23-v1', 'inversely proportional', 'adj phr', 'tỉ lệ nghịch', 'If $y = \\frac{a}{x}$ ($xy = a \\ne 0$), then $y$ is inversely proportional to $x$.', 'Nếu $y = \\frac{a}{x}$ ($a \\ne 0$) thì $y$ tỉ lệ nghịch với $x$ theo hệ số $a$.', 'Time and speed for a fixed distance are inversely proportional.', 'Trên cùng một quãng đường, thời gian và vận tốc tỉ lệ nghịch với nhau.'),
        v('g7l23-v2', 'constant product', 'n phr', 'tích không đổi', 'For inversely proportional quantities, $x_1 y_1 = x_2 y_2 = a$.', 'Tích hai giá trị tương ứng của hai đại lượng tỉ lệ nghịch luôn không đổi.', 'More workers on the same job take fewer days, keeping workers times days constant.', 'Số công nhân và số ngày làm cùng một công việc có tích không đổi.'),
      ],
      [
        n('g7l23-n1', 'x \\cdot y = a \\;(a \\ne 0) \\Rightarrow x_1 y_1 = x_2 y_2', 'x times y equals a implies x one y one equals x two y two', 'tích x nhân y luôn bằng hệ số tỉ lệ a không đổi'),
      ],
      [
        e('g7l23-e1', 'describe', 'For inverse proportion, the ratio of two values of $x$ equals the reciprocal ratio of the two values of $y$.', 'Với hai đại lượng tỉ lệ nghịch, tỉ số hai giá trị của đại lượng này bằng nghịch đảo tỉ số hai giá trị tương ứng của đại lượng kia.'),
        e('g7l23-e2', 'question', 'If $6$ identical pumps empty a tank in $4$ hours, how long do $8$ such pumps take?', 'Nếu $6$ máy bơm bơm đầy bể trong $4$ giờ thì $8$ máy bơm như thế mất bao lâu?'),
        e('g7l23-e3', 'present', 'Since pumps and time are inversely proportional, $8t = 6 \\times 4 = 24$, so $t = 3$ hours.', 'Vì số máy bơm và thời gian tỉ lệ nghịch nên $8t = 6 \\times 4 = 24 \\Rightarrow t = 3$ giờ.'),
      ],
      [
        ex(
          'g7l23-ex1',
          'Inverse proportion work problem',
          'Bài toán tỉ lệ nghịch về năng suất',
          '$12$ workers finish a road in $10$ days. How many workers are needed to finish it in $8$ days (same productivity)?',
          '$12$ công nhân làm xong đoạn đường trong $10$ ngày. Cần bao nhiêu công nhân để làm xong trong $8$ ngày?',
          [
            s('Step 1: Set up inverse proportion', 'Bước 1: Lập đẳng thức tỉ lệ nghịch', 'Let $x$ be the required workers. Since workers and days are inversely proportional, $8 \\cdot x = 12 \\cdot 10$.', 'Gọi $x$ là số công nhân cần tìm. Ta có $8 \\cdot x = 12 \\cdot 10$.'),
            s('Step 2: Solve for $x$', 'Bước 2: Tính $x$', '$x = \\frac{120}{8} = 15$ workers.', '$x = \\frac{120}{8} = 15$ công nhân.'),
          ],
          'It takes $15$ workers.',
          'Cần $15$ công nhân.'
        ),
      ],
      ['Đối chiếu trực diện: `Direct: y/x = k (same direction)` vs `Inverse: x·y = a (opposite direction)`.']
    ),
  ]),
  chapter(7, 7, 'Algebraic Expressions and Polynomials in One Variable', 'Biểu thức đại số và đa thức một biến', [
    lesson(
      7, 7, 24,
      'Algebraic Expressions',
      'Biểu thức đại số',
      ['Distinguish numerical expressions and algebraic expressions containing variables.', 'Evaluate an algebraic expression by substituting given variable values.'],
      ['Phân biệt biểu thức số và biểu thức đại số.', 'Tính giá trị biểu thức đại số khi thay giá trị của biến.'],
      [
        v('g7l24-v1', 'algebraic expression / variable', 'n phr', 'biểu thức đại số / biến số', 'An expression built from numbers, variables (letters), and arithmetic operations.', 'Biểu thức gồm số, các chữ đại diện cho số (biến) nối với nhau bằng các phép tính.', 'The area of a rectangle with width $x$ and length $x+3$ is $x(x+3)$.', 'Diện tích hình chữ nhật rộng $x$, dài $x+3$ là $x(x+3)$.'),
        v('g7l24-v2', 'substitute / evaluate', 'v', 'thay thế / tính giá trị', 'Replacing variables with specific numbers to compute the numerical value of an expression.', 'Thay giá trị cụ thể vào biến để tính ra kết quả số.', 'Substitute $x = 2$ and $y = -3$ into $2x^2 - y$.', 'Thay $x = 2$ và $y = -3$ vào biểu thức $2x^2 - y$.'),
      ],
      [
        n('g7l24-n1', 'P(x)\\big|_{x = -2}', 'evaluate P at x equals negative two', 'giá trị của biểu thức P tại x bằng âm 2'),
      ],
      [
        e('g7l24-e1', 'describe', 'Multiplication signs between a number and a variable or between variables are usually omitted, like $3x$ instead of $3 \\cdot x$.', 'Dấu nhân giữa số và chữ hoặc giữa các chữ thường được viết gọn bỏ đi, ví dụ $3x$.'),
        e('g7l24-e2', 'question', 'How do we write "the square of the sum of $a$ and $b$" as an algebraic expression?', 'Viết biểu thức đại số biểu thị "bình phương của tổng $a$ và $b$" như thế nào?'),
        e('g7l24-e3', 'present', 'Substituting $x = -1$ into $3x^2 - 5x + 1$ gives $3(1) - 5(-1) + 1 = 9$.', 'Thay $x = -1$ vào $3x^2 - 5x + 1$ được $3(1) - 5(-1) + 1 = 9$.'),
      ],
      [
        ex(
          'g7l24-ex1',
          'Evaluating an algebraic expression',
          'Tính giá trị biểu thức đại số',
          'Evaluate $A = 2x^2 - 3xy + y^2$ at $x = 2$ and $y = -1$.',
          'Tính giá trị biểu thức $A = 2x^2 - 3xy + y^2$ tại $x = 2; y = -1$.',
          [
            s('Step 1: Substitute with parentheses', 'Bước 1: Thay số giữ ngoặc cẩn thận', '$A = 2(2)^2 - 3(2)(-1) + (-1)^2$.', '$A = 2(2)^2 - 3(2)(-1) + (-1)^2$.'),
            s('Step 2: Compute powers and products', 'Bước 2: Tính lũy thừa và nhân', '$A = 2(4) + 6 + 1 = 8 + 6 + 1 = 15$.', '$A = 8 + 6 + 1 = 15$.'),
          ],
          'At $x = 2, y = -1$, $A = 15$.',
          'Tại $x = 2; y = -1$, giá trị $A = 15$.'
        ),
      ],
      ['Luôn nhắc đặt số âm trong dấu ngoặc đơn khi thay thế vào lũy thừa: $(-1)^2$, tránh nhầm thành $-1^2$.']
    ),
    lesson(
      7, 7, 25,
      'Polynomials in One Variable',
      'Đa thức một biến',
      ['Write a polynomial in standard (descending/ascending degree) form.', 'Identify degree, leading coefficient, constant term, and roots/zeros of a polynomial.'],
      ['Thu gọn và sắp xếp đa thức một biến theo lũy thừa giảm hoặc tăng của biến.', 'Xác định bậc, hệ số cao nhất, hệ số tự do và nghiệm của đa thức.'],
      [
        v('g7l25-v1', 'polynomial in one variable', 'n phr', 'đa thức một biến', 'A finite sum of monomials in the same variable $x$.', 'Tổng của những đơn thức của cùng một biến.', 'Combine like terms to put $P(x)$ in standard form.', 'Thu gọn các đơn thức đồng dạng để đưa $P(x)$ về dạng thu gọn.'),
        v('g7l25-v2', 'degree / leading coefficient / constant term', 'n phr', 'bậc / hệ số cao nhất / hệ số tự do', 'The highest exponent of $x$ with nonzero coefficient, its coefficient, and the term without $x$.', 'Số mũ lớn nhất của biến, hệ số của hạng tử đó và hạng tử không chứa biến.', 'In $4x^3 - 2x + 7$, the degree is $3$, leading coefficient is $4$, and constant term is $7$.', 'Đa thức $4x^3 - 2x + 7$ có bậc $3$, hệ số cao nhất là $4$, hệ số tự do là $7$.'),
        v('g7l25-v3', 'root / zero of a polynomial', 'n phr', 'nghiệm của đa thức', 'A value $x = a$ such that $P(a) = 0$.', 'Giá trị $x = a$ làm cho $P(a) = 0$.', '$x = 3$ is a root of $P(x) = 2x - 6$ because $P(3) = 0$.', '$x = 3$ là nghiệm của $P(x) = 2x - 6$ vì $P(3) = 0$.'),
      ],
      [
        n('g7l25-n1', 'P(a) = 0 \\Rightarrow a \\text{ is a root of } P(x)', 'P of a equals zero implies a is a root of P of x', 'P tại a bằng 0 suy ra a là nghiệm của đa thức P(x)'),
      ],
      [
        e('g7l25-e1', 'describe', 'Always combine like terms before determining the degree and leading coefficient of a polynomial.', 'Luôn thu gọn đa thức trước khi xác định bậc và hệ số cao nhất.'),
        e('g7l25-e2', 'question', 'How do we check if $x = -2$ is a root (zero) of $Q(x) = x^2 - 4$?', 'Ta kiểm tra xem $x = -2$ có phải nghiệm của $Q(x) = x^2 - 4$ bằng cách nào?'),
        e('g7l25-e3', 'present', 'Arranging in descending powers of $x$ gives $P(x) = -2x^4 + 5x^2 - x + 3$.', 'Sắp xếp theo lũy thừa giảm của biến ta được $P(x) = -2x^4 + 5x^2 - x + 3$.'),
      ],
      [
        ex(
          'g7l25-ex1',
          'Standard form, degree, and roots',
          'Thu gọn, tìm bậc và nghiệm của đa thức',
          'Simplify $P(x) = 3x^2 - 5x + x^2 + 5x - 16$ and find its roots.',
          'Thu gọn $P(x) = 3x^2 - 5x + x^2 + 5x - 16$, nêu bậc và tìm nghiệm.',
          [
            s('Step 1: Combine like terms', 'Bước 1: Thu gọn các hạng tử đồng dạng', '$P(x) = (3x^2 + x^2) + (-5x + 5x) - 16 = 4x^2 - 16$.', '$P(x) = 4x^2 - 16$ (bậc $2$, hệ số cao nhất $4$, hệ số tự do $-16$).'),
            s('Step 2: Solve $P(x) = 0$', 'Bước 2: Giải $P(x) = 0$', '$4x^2 - 16 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ or $x = -2$.', '$4x^2 = 16 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$.'),
          ],
          'Degree is $2$; the roots are $x = 2$ and $x = -2$.',
          'Đa thức bậc $2$; có hai nghiệm là $x = 2$ và $x = -2$.'
        ),
      ],
      ['Trong tiếng Anh dùng song song cả `root` và `zero` cho nghiệm của đa thức.']
    ),
    lesson(
      7, 7, 26,
      'Addition and Subtraction of Polynomials in One Variable',
      'Phép cộng và phép trừ đa thức một biến',
      ['Add and subtract polynomials horizontally (grouping like terms) or vertically (aligning degrees).', 'Pay special attention to the phrasing "subtract $Q(x)$ from $P(x)$".'],
      ['Cộng trừ đa thức một biến theo hàng ngang hoặc cột dọc.', 'Chú ý thứ tự phép trừ trong tiếng Anh: "subtract $Q(x)$ from $P(x)$" nghĩa là $P(x) - Q(x)$.'],
      [
        v('g7l26-v1', 'like terms', 'n phr', 'các hạng tử đồng dạng', 'Terms having the exact same variable power (e.g., $5x^2$ and $-2x^2$).', 'Các hạng tử có cùng lũy thừa của biến.', 'Align like terms in vertical columns.', 'Đặt các hạng tử đồng dạng thẳng cột khi cộng trừ theo cột dọc.'),
        v('g7l26-v2', 'subtract Q(x) from P(x)', 'v phr', 'lấy P(x) trừ Q(x)', 'Means $P(x) - Q(x)$, reversing the order compared to spoken sequence.', 'Nghĩa là thực hiện $P(x) - Q(x)$ (ngược thứ tự từ trái sang phải).', 'Subtract $x^2 - 1$ from $3x^2 + 2$ gives $(3x^2 + 2) - (x^2 - 1)$.', 'Trừ $x^2 - 1$ khỏi $3x^2 + 2$ cho kết quả $(3x^2 + 2) - (x^2 - 1)$.'),
      ],
      [
        n('g7l26-n1', 'P(x) - Q(x) = P(x) + (-Q(x))', 'subtracting Q of x from P of x equals adding the opposite of Q of x', 'trừ đa thức Q(x) khỏi P(x) bằng cộng với đa thức đối của Q(x)'),
      ],
      [
        e('g7l26-e1', 'describe', 'When subtracting polynomials, wrap the entire second polynomial in parentheses before flipping signs.', 'Khi trừ đa thức, luôn đặt đa thức bị trừ thứ hai trong ngoặc trước khi phá ngoặc đổi dấu.'),
        e('g7l26-e2', 'question', 'In the prompt "Subtract $Q(x)$ from $P(x)$", which polynomial comes first?', 'Trong câu "Subtract $Q(x)$ from $P(x)$", đa thức nào đứng trước dấu trừ?'),
        e('g7l26-e3', 'present', 'Grouping like powers gives $(3x^2 - x^2) + (-4x + 2x) + (5 - 1) = 2x^2 - 2x + 4$.', 'Nhóm các hạng tử cùng bậc ta được $2x^2 - 2x + 4$.'),
      ],
      [
        ex(
          'g7l26-ex1',
          'Adding and subtracting two polynomials',
          'Cộng và trừ hai đa thức một biến',
          'Given $P(x) = 3x^2 - 4x + 5$ and $Q(x) = x^2 - 2x + 1$, find $P(x) + Q(x)$ and subtract $Q(x)$ from $P(x)$.',
          'Cho $P(x) = 3x^2 - 4x + 5$ và $Q(x) = x^2 - 2x + 1$. Tính $P(x) + Q(x)$ và $P(x) - Q(x)$.',
          [
            s('Step 1: Compute sum', 'Bước 1: Tính tổng $P(x) + Q(x)$', '$P(x) + Q(x) = (3+1)x^2 + (-4-2)x + (5+1) = 4x^2 - 6x + 6$.', '$P(x) + Q(x) = 4x^2 - 6x + 6$.'),
            s('Step 2: Compute difference $P(x) - Q(x)$', 'Bước 2: Tính hiệu $P(x) - Q(x)$', '$P(x) - Q(x) = 3x^2 - 4x + 5 - x^2 + 2x - 1 = 2x^2 - 2x + 4$.', '$P(x) - Q(x) = 2x^2 - 2x + 4$.'),
          ],
          'Sum is $4x^2 - 6x + 6$; difference is $2x^2 - 2x + 4$.',
          'Tổng là $4x^2 - 6x + 6$; hiệu là $2x^2 - 2x + 4$.'
        ),
      ],
      ['Điểm mấu chốt dễ sai khi đọc đề tiếng Anh: `subtract A from B` = $B - A$, còn `subtract B from A` = $A - B$.']
    ),
    lesson(
      7, 7, 27,
      'Multiplication of Polynomials in One Variable',
      'Phép nhân đa thức một biến',
      ['Multiply a monomial by a polynomial and a polynomial by a polynomial using the distributive law.', 'Simplify expanded expressions by combining like terms.'],
      ['Nhân đơn thức với đa thức và nhân đa thức với đa thức.', 'Thu gọn biểu thức sau khi khai triển tích.'],
      [
        v('g7l27-v1', 'expand / multiply out', 'v / v phr', 'nhân khai triển', 'Applying the distributive property to remove parentheses by multiplying terms.', 'Nhân phân phối các hạng tử để bỏ dấu ngoặc.', 'Multiply each term of the first polynomial by every term of the second.', 'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia.'),
      ],
      [
        n('g7l27-n1', '(A + B)(C + D) = AC + AD + BC + BD', 'multiply every term of the first bracket by every term of the second', 'nhân từng hạng tử của ngoặc thứ nhất với từng hạng tử của ngoặc thứ hai'),
      ],
      [
        e('g7l27-e1', 'describe', 'When multiplying two powers of $x$, multiply the coefficients and add the exponents of $x$.', 'Khi nhân hai đơn thức cùng biến $x$, ta nhân các hệ số và cộng các số mũ của $x$.'),
        e('g7l27-e2', 'question', 'How many products appear before combining like terms when multiplying a binomial by a trinomial?', 'Khi nhân nhị thức với tam thức, có bao nhiêu tích xuất hiện trước khi thu gọn?'),
        e('g7l27-e3', 'present', 'Expanding $(x - 2)(x + 5)$ yields $x^2 + 5x - 2x - 10 = x^2 + 3x - 10$.', 'Khai triển $(x - 2)(x + 5)$ ta được $x^2 + 3x - 10$.'),
      ],
      [
        ex(
          'g7l27-ex1',
          'Expanding and simplifying a polynomial product',
          'Nhân đa thức và rút gọn',
          'Expand and simplify $(2x - 1)(x + 3) - 2x^2$.',
          'Rút gọn biểu thức $(2x - 1)(x + 3) - 2x^2$.',
          [
            s('Step 1: Expand product', 'Bước 1: Nhân hai đa thức', '$(2x - 1)(x + 3) = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$.', '$(2x - 1)(x + 3) = 2x^2 + 5x - 3$.'),
            s('Step 2: Subtract $2x^2$', 'Bước 2: Trừ $2x^2$', '$(2x^2 + 5x - 3) - 2x^2 = 5x - 3$.', '$2x^2 + 5x - 3 - 2x^2 = 5x - 3$.'),
          ],
          'The simplified result is $5x - 3$.',
          'Biểu thức rút gọn là $5x - 3$.'
        ),
      ],
      ['Cẩn thận dấu âm trước dấu ngoặc khi biểu thức có dạng $A(x) - (x-1)(x+2)$.']
    ),
    lesson(
      7, 7, 28,
      'Division of Polynomials in One Variable',
      'Phép chia đa thức một biến',
      ['Perform polynomial long division to find quotient $Q(x)$ and remainder $R(x)$.', 'Distinguish exact division ($R(x) = 0$) from division with remainder ($\\deg R < \\deg B$).'],
      ['Thực hiện phép chia đa thức một biến đã sắp xếp.', 'Phân biệt phép chia hết ($R(x) = 0$) và phép chia có dư (bậc dư nhỏ hơn bậc số chia).'],
      [
        v('g7l28-v1', 'polynomial division / exact division / division with remainder', 'n phr', 'phép chia đa thức / chia hết / chia có dư', 'Writing $A(x) = B(x) \\cdot Q(x) + R(x)$ where $R(x) = 0$ or $\\deg R(x) < \\deg B(x)$.', 'Biểu diễn $A(x) = B(x) \\cdot Q(x) + R(x)$ với bậc của $R$ nhỏ hơn bậc của $B$.', 'Divide the highest-degree term of the dividend by the highest-degree term of the divisor.', 'Lấy hạng tử bậc cao nhất của đa thức bị chia chia cho hạng tử bậc cao nhất của đa thức chia.'),
      ],
      [
        n('g7l28-n1', 'A(x) = B(x) \\cdot Q(x) + R(x)', 'dividend A equals divisor B times quotient Q plus remainder R', 'đa thức bị chia A bằng đa thức chia B nhân thương Q cộng dư R'),
      ],
      [
        e('g7l28-e1', 'describe', 'Always arrange both dividend and divisor in descending powers of $x$ and leave space for any missing degree.', 'Luôn sắp xếp hai đa thức theo lũy thừa giảm và chừa trống vị trí bậc bị khuyết trước khi đặt phép chia.'),
        e('g7l28-e2', 'question', 'When do we stop the polynomial division process?', 'Khi nào ta dừng quá trình chia đa thức?'),
        e('g7l28-e3', 'present', 'Stop when the remainder is $0$ or its degree is strictly less than the degree of the divisor.', 'Dừng lại khi dư bằng $0$ hoặc bậc của đa thức dư nhỏ hơn bậc của đa thức chia.'),
      ],
      [
        ex(
          'g7l28-ex1',
          'Polynomial long division',
          'Chia đa thức một biến',
          'Divide $A(x) = 2x^2 + 5x - 3$ by $B(x) = x + 3$.',
          'Thực hiện phép chia $(2x^2 + 5x - 3) : (x + 3)$.',
          [
            s('Step 1: First term of quotient', 'Bước 1: Tìm hạng tử đầu của thương', '$2x^2 : x = 2x$. Subtract $2x(x + 3) = 2x^2 + 6x$ from $A(x)$ to get $-x - 3$.', '$2x^2 : x = 2x$. Trừ đi $2x(x+3) = 2x^2 + 6x$ còn dư $-x - 3$.'),
            s('Step 2: Second term of quotient', 'Bước 2: Chia tiếp dư $-x - 3$', '$(-x) : x = -1$. Subtract $(-1)(x + 3) = -x - 3$ to get remainder $0$.', '$(-x) : x = -1$, trừ tiếp được dư $0$.'),
          ],
          'The quotient is $2x - 1$ (exact division).',
          'Thương là $2x - 1$ (phép chia hết).'
        ),
      ],
      ['Lưu ý chừa khoảng trống cho bậc bị khuyết (ví dụ $x^3 - 1 = x^3 + 0x^2 + 0x - 1$) để không bị trừ nhầm cột.']
    ),
  ]),
  chapter(7, 8, 'Getting to Know Events and Probability of an Event', 'Làm quen với biến cố và xác suất của biến cố', [
    lesson(
      7, 8, 29,
      'Getting to Know Events',
      'Làm quen với biến cố',
      ['Classify events as certain, impossible, or random.', 'Explain why an event falls into each category with clear reasoning.'],
      ['Phân biệt biến cố chắc chắn, biến cố không thể và biến cố ngẫu nhiên.', 'Giải thích được căn cứ phân loại từng biến cố.'],
      [
        v('g7l29-v1', 'certain event / impossible event / random event', 'n phr', 'biến cố chắc chắn / không thể / ngẫu nhiên', 'Events that always happen ($100\\%$), never happen ($0\\%$), or may or may not happen.', 'Biến cố luôn xảy ra, không bao giờ xảy ra, hoặc có thể xảy ra hoặc không.', 'Rolling a number less than $7$ on a standard die is a certain event.', 'Gieo xúc xắc được số chấm nhỏ hơn $7$ là biến cố chắc chắn.'),
        v('g7l29-v2', 'chance experiment', 'n phr', 'phép thử ngẫu nhiên', 'An action whose exact outcome cannot be predicted with certainty beforehand.', 'Hoạt động mà kết quả không thể đoán trước chắc chắn được.', 'Drawing a marble blindfolded is a chance experiment.', 'Lấy ngẫu nhiên một viên bi trong túi là một phép thử.'),
      ],
      [
        n('g7l29-n1', '\\text{Certain } \\to P = 1; \\quad \\text{Impossible } \\to P = 0', 'a certain event has probability one, and an impossible event has probability zero', 'biến cố chắc chắn có xác suất 1, biến cố không thể có xác suất 0'),
      ],
      [
        e('g7l29-e1', 'describe', 'An event whose occurrence depends purely on chance is called a random event.', 'Biến cố có thể xảy ra hoặc không xảy ra gọi là biến cố ngẫu nhiên.'),
        e('g7l29-e2', 'question', 'Is "rolling a $7$ on a standard six-sided die" impossible or random?', 'Biến cố "gieo xúc xắc sáu mặt được mặt 7 chấm" là không thể hay ngẫu nhiên?'),
        e('g7l29-e3', 'present', 'Because the faces only show $1$ to $6$, rolling a $7$ is an impossible event.', 'Vì xúc xắc chỉ có các mặt từ $1$ đến $6$ nên ra mặt $7$ là biến cố không thể.'),
      ],
      [
        ex(
          'g7l29-ex1',
          'Classifying three events',
          'Phân loại ba loại biến cố',
          'A box holds $4$ red and $2$ blue balls. Draw $1$ ball: A: "red ball"; B: "green ball"; C: "red or blue ball". Classify A, B, C.',
          'Hộp có $4$ bóng đỏ, $2$ bóng xanh. Lấy $1$ bóng: A: "bóng đỏ"; B: "bóng lục"; C: "bóng đỏ hoặc xanh". Phân loại A, B, C.',
          [
            s('Step 1: Check A', 'Bước 1: Xét biến cố A', 'A red ball may or may not be drawn $\\Rightarrow$ random event.', 'Có thể lấy được đỏ hoặc xanh $\\Rightarrow$ A là biến cố ngẫu nhiên.'),
            s('Step 2: Check B and C', 'Bước 2: Xét B và C', 'No green balls exist $\\Rightarrow$ B is impossible; every ball is red or blue $\\Rightarrow$ C is certain.', 'Không có bóng lục $\\Rightarrow$ B không thể; mọi bóng đều đỏ hoặc xanh $\\Rightarrow$ C chắc chắn.'),
          ],
          'A is random, B is impossible, C is certain.',
          'A ngẫu nhiên, B không thể, C chắc chắn.'
        ),
      ],
      ['Từ lớp 6 dùng `sự kiện` (`event`), lên lớp 7 dùng thuật ngữ `biến cố` (`event`).']
    ),
    lesson(
      7, 8, 30,
      'Probability of an Event',
      'Làm quen với xác suất của biến cố',
      ['Calculate the probability of an event when all outcomes are equally likely.', 'Compare likelihoods of events using probabilities on $[0, 1]$.'],
      ['Tính xác suất của biến cố trong trường hợp các kết quả đồng khả năng.', 'So sánh khả năng xảy ra các biến cố bằng xác suất từ $0$ đến $1$.'],
      [
        v('g7l30-v1', 'equally likely outcomes', 'n phr', 'các kết quả đồng khả năng', 'Outcomes having the exact same chance of occurring.', 'Các kết quả có khả năng xuất hiện như nhau.', 'On a fair die, the six outcomes $1$–$6$ are equally likely.', 'Với xúc xắc cân đối, $6$ mặt có khả năng xuất hiện như nhau (đồng khả năng).'),
        v('g7l30-v2', 'probability $P(A)$', 'n', 'xác suất của biến cố', 'Number in $[0, 1]$ measuring the likelihood of event $A$: $\\frac{\\text{favorable}}{\\text{total equally likely}}$.', 'Số đo khả năng xảy ra biến cố $A$ (từ $0$ đến $1$).', 'The probability of rolling an even number is $\\frac{3}{6} = \\frac{1}{2}$.', 'Xác suất gieo được số chẵn là $\\frac{3}{6} = \\frac{1}{2}$.'),
      ],
      [
        n('g7l30-n1', '0 \\le P(A) \\le 1', 'the probability of A is between zero and one inclusive', 'xác suất của biến cố A luôn từ 0 đến 1'),
      ],
      [
        e('g7l30-e1', 'describe', 'Equally likely outcomes mean each single outcome out of $n$ has probability $\\frac{1}{n}$.', 'Khi có $n$ kết quả đồng khả năng thì xác suất mỗi kết quả đều bằng $\\frac{1}{n}$.'),
        e('g7l30-e2', 'question', 'How many outcomes are favorable to drawing a multiple of $3$ from cards numbered $1$ to $10$?', 'Rút một thẻ từ các thẻ đánh số $1$ đến $10$, có mấy kết quả thuận lợi cho biến cố ra bội của $3$?'),
        e('g7l30-e3', 'present', 'Since $3$ out of $10$ cards ($3, 6, 9$) are multiples of $3$, $P = \\frac{3}{10} = 0.3$.', 'Có $3$ thẻ bội của $3$ ($3; 6; 9$) trên $10$ thẻ nên $P = \\frac{3}{10} = 0{,}3$.'),
      ],
      [
        ex(
          'g7l30-ex1',
          'Finding theoretical probability with equally likely outcomes',
          'Tính xác suất các biến cố đồng khả năng',
          'Pick a random integer from $1$ to $12$. Find the probability of picking a prime number.',
          'Chọn ngẫu nhiên một số tự nhiên từ $1$ đến $12$. Tính xác suất chọn được số nguyên tố.',
          [
            s('Step 1: Count total equally likely outcomes', 'Bước 1: Đếm tổng số kết quả đồng khả năng', 'There are $12$ numbers from $1$ to $12$.', 'Có $12$ kết quả đồng khả năng.'),
            s('Step 2: Count favorable outcomes and divide', 'Bước 2: Đếm kết quả thuận lợi và tính xác suất', 'Prime numbers are $2, 3, 5, 7, 11$ ($5$ numbers), so $P = \\frac{5}{12}$.', 'Các số nguyên tố là $2; 3; 5; 7; 11$ ($5$ số), nên $P = \\frac{5}{12}$.'),
          ],
          'The probability is $\\frac{5}{12}$.',
          'Xác suất cần tìm là $\\frac{5}{12}$.'
        ),
      ],
      ['Luôn nhấn mạnh điều kiện "equally likely" (cân đối, đồng chất, ngẫu nhiên) trước khi chia đếm.']
    ),
  ]),
  chapter(7, 9, 'Relationships Between Elements in a Triangle', 'Quan hệ giữa các yếu tố trong một tam giác', [
    lesson(
      7, 9, 31,
      'Relationship Between Angles and Opposite Sides in a Triangle',
      'Quan hệ giữa góc và cạnh đối diện trong một tam giác',
      ['Compare two sides given opposite angle measures, and compare two angles given opposite side lengths.', 'Identify the longest side of an obtuse or right triangle.'],
      ['So sánh hai cạnh dựa vào hai góc đối diện và ngược lại.', 'Nhận biết cạnh lớn nhất trong tam giác tù và tam giác vuông.'],
      [
        v('g7l31-v1', 'opposite side / opposite angle', 'n phr', 'cạnh đối diện / góc đối diện', 'In $\\triangle ABC$, side $BC$ is opposite $\\angle A$, and $\\angle A$ is opposite side $BC$.', 'Trong $\\triangle ABC$, cạnh $BC$ đối diện với góc $A$ và góc $A$ đối diện cạnh $BC$.', 'A larger angle lies opposite a longer side.', 'Góc lớn hơn đối diện với cạnh lớn hơn.'),
      ],
      [
        n('g7l31-n1', 'AB > AC \\Leftrightarrow \\widehat{C} > \\widehat{B}', 'side A B is longer than A C if and only if angle C is greater than angle B', 'cạnh AB lớn hơn AC khi và chỉ khi góc C lớn hơn góc B'),
      ],
      [
        e('g7l31-e1', 'describe', 'In any right or obtuse triangle, the side opposite the right or obtuse angle is the longest side.', 'Trong tam giác vuông hoặc tù, cạnh đối diện với góc vuông hoặc góc tù là cạnh lớn nhất.'),
        e('g7l31-e2', 'question', 'In $\\triangle ABC$ with $\\angle A = 80^\\circ, \\angle B = 45^\\circ$, arrange its sides from shortest to longest.', 'Trong $\\triangle ABC$ có $\\widehat{A} = 80^\\circ, \\widehat{B} = 45^\\circ$, hãy sắp xếp các cạnh từ bé đến lớn.'),
        e('g7l31-e3', 'present', 'Since $\\angle B < \\angle C < \\angle A$ ($45^\\circ < 55^\\circ < 80^\\circ$), we have $AC < AB < BC$.', 'Vì $\\widehat{B} < \\widehat{C} < \\widehat{A}$ nên $AC < AB < BC$.'),
      ],
      [
        ex(
          'g7l31-ex1',
          'Ordering sides from angles',
          'So sánh các cạnh từ số đo góc',
          'In $\\triangle MNP$, $\\angle M = 65^\\circ$ and $\\angle N = 50^\\circ$. Find the longest and shortest sides.',
          'Cho $\\triangle MNP$ có $\\widehat{M} = 65^\\circ, \\widehat{N} = 50^\\circ$. Tìm cạnh dài nhất và ngắn nhất.',
          [
            s('Step 1: Find $\\angle P$', 'Bước 1: Tính $\\widehat{P}$', '$\\angle P = 180^\\circ - 65^\\circ - 50^\\circ = 65^\\circ$.', '$\\widehat{P} = 180^\\circ - 65^\\circ - 50^\\circ = 65^\\circ$.'),
            s('Step 2: Compare angles to sides', 'Bước 2: Suy ra quan hệ cạnh', 'Since $\\angle N < \\angle M = \\angle P$, side $MP$ is shortest, and $NP = MN$ are longest.', 'Vì $\\widehat{N} < \\widehat{M} = \\widehat{P}$ nên $MP$ ngắn nhất, còn $NP = MN$ dài nhất.'),
          ],
          '$MP < NP = MN$.',
          '$MP < NP = MN$.'
        ),
      ],
      ['Luôn tính đủ cả ba góc của tam giác trước khi so sánh ba cạnh.']
    ),
    lesson(
      7, 9, 32,
      'Relationship Between Perpendicular and Oblique Segments',
      'Quan hệ giữa đường vuông góc và đường xiên',
      ['Define perpendicular segment, oblique segment, and distance from a point to a line.', 'Apply the rule that the perpendicular segment is shorter than every oblique segment from the same point.'],
      ['Nhận biết đường vuông góc, đường xiên và khoảng cách từ một điểm đến đường thẳng.', 'Áp dụng tính chất đường vuông góc ngắn hơn mọi đường xiên.'],
      [
        v('g7l32-v1', 'perpendicular segment / oblique segment', 'n phr', 'đường vuông góc / đường xiên', 'Segment $AH \\perp d$ vs. any other segment $AB$ ($B \\in d, B \\ne H$).', 'Đoạn vuông góc $AH \\perp d$ và đoạn thẳng nối $A$ tới điểm $B \\ne H$ trên $d$.', 'The perpendicular segment is shorter than any oblique segment from $A$ to line $d$.', 'Đường vuông góc ngắn hơn mọi đường xiên kẻ từ điểm $A$ đến đường thẳng $d$.'),
        v('g7l32-v2', 'distance from a point to a line', 'n phr', 'khoảng cách từ một điểm đến một đường thẳng', 'The length of the perpendicular segment dropped from point $A$ to line $d$.', 'Độ dài đường vuông góc kẻ từ điểm $A$ đến đường thẳng $d$.', 'The shortest distance from $A$ to line $d$ is $AH$.', 'Khoảng cách ngắn nhất từ $A$ đến $d$ là độ dài $AH$.'),
      ],
      [
        n('g7l32-n1', 'AH < AB \\;(\\forall B \\in d, B \\ne H)', 'perpendicular segment A H is strictly shorter than any oblique segment A B', 'đường vuông góc AH ngắn hơn mọi đường xiên AB'),
      ],
      [
        e('g7l32-e1', 'describe', 'The shortest path from a point to a straight line (or bank of a river) is along the perpendicular.', 'Đường ngắn nhất từ một điểm đến đường thẳng chính là đường vuông góc.'),
        e('g7l32-e2', 'question', 'In right $\\triangle AHB$ at $H$, why is $AH < AB$?', 'Trong tam giác $AHB$ vuông tại $H$, vì sao $AH < AB$?'),
        e('g7l32-e3', 'present', 'Since $AB$ is opposite the $90^\\circ$ angle and $AH$ is opposite an acute angle, $AH < AB$.', 'Vì $AB$ đối diện góc vuông $90^\\circ$ còn $AH$ đối diện góc nhọn nên $AH < AB$.'),
      ],
      [
        ex(
          'g7l32-ex1',
          'Shortest path to a road',
          'Ứng dụng đường vuông góc tìm đường ngắn nhất',
          'From a house $A$, a perpendicular path to straight road $d$ is $AH = 12\\text{ m}$. Can an oblique path $AM$ have length $10\\text{ m}$?',
          'Từ nhà $A$, đường vuông góc ra đường thẳng $d$ dài $AH = 12\\text{ m}$. Một lối đi xiên $AM$ có thể dài $10\\text{ m}$ không?',
          [
            s('Step 1: Compare perpendicular and oblique', 'Bước 1: So sánh đường vuông góc và đường xiên', 'By theorem, every oblique segment $AM$ satisfies $AM > AH = 12\\text{ m}$.', 'Mọi đường xiên $AM$ đều thỏa $AM > AH = 12\\text{ m}$.'),
            s('Step 2: Conclude', 'Bước 2: Kết luận', 'Thus $10\\text{ m}$ is impossible.', 'Vậy $AM$ không thể dài $10\\text{ m}$.'),
          ],
          'No, any oblique path must exceed $12\\text{ m}$.',
          'Không thể, mọi đường xiên đều phải dài hơn $12\\text{ m}$.'
        ),
      ],
      ['Từ khóa `perpendicular segment` (đường vuông góc) và `oblique segment` (đường xiên).']
    ),
    lesson(
      7, 9, 33,
      'Relationship Between the Three Sides of a Triangle',
      'Quan hệ giữa ba cạnh của một tam giác',
      ['State and apply the Triangle Inequality Theorem ($|b - c| < a < b + c$).', 'Determine quickly whether three given lengths can form a triangle.'],
      ['Phát biểu bất đẳng thức tam giác ($|b - c| < a < b + c$).', 'Kiểm tra nhanh ba độ dài cho trước có tạo thành tam giác hay không.'],
      [
        v('g7l33-v1', 'triangle inequality', 'n phr', 'bất đẳng thức tam giác', 'In any triangle, the length of one side is less than the sum and greater than the difference of the other two sides.', 'Trong một tam giác, độ dài một cạnh luôn nhỏ hơn tổng và lớn hơn hiệu độ dài hai cạnh còn lại.', 'To check three lengths, verify that the sum of the two shorter sides exceeds the longest side.', 'Chỉ cần kiểm tra tổng hai cạnh ngắn hơn có lớn hơn cạnh dài nhất không.'),
      ],
      [
        n('g7l33-n1', '|b - c| < a < b + c', 'side a lies strictly between the difference and the sum of the other two sides', 'cạnh a lớn hơn hiệu và nhỏ hơn tổng hai cạnh kia'),
      ],
      [
        e('g7l33-e1', 'describe', 'You only need to check one inequality: the two shorter lengths together must be strictly greater than the longest length.', 'Chỉ cần kiểm tra tổng hai đoạn ngắn nhất lớn hơn hẳn đoạn dài nhất là đủ.'),
        e('g7l33-e2', 'question', 'Can sides $3\\text{ cm}, 4\\text{ cm}, 7\\text{ cm}$ form a triangle?', 'Ba đoạn thẳng $3\\text{ cm}, 4\\text{ cm}, 7\\text{ cm}$ có lập thành tam giác được không?'),
        e('g7l33-e3', 'present', 'Because $3 + 4 = 7$ is not strictly greater than $7$, they cannot form a triangle.', 'Vì $3 + 4 = 7$ không lớn hơn $7$ nên ba đoạn không lập thành tam giác.'),
      ],
      [
        ex(
          'g7l33-ex1',
          'Finding the third side of an isosceles triangle',
          'Tìm cạnh còn lại của tam giác cân',
          'An isosceles triangle has two sides of lengths $3\\text{ cm}$ and $8\\text{ cm}$. Find its perimeter.',
          'Một tam giác cân có độ dài hai cạnh là $3\\text{ cm}$ và $8\\text{ cm}$. Tính chu vi tam giác.',
          [
            s('Step 1: Test the third side cases', 'Bước 1: Xét hai trường hợp cho cạnh thứ ba', 'If the third side is $3\\text{ cm}$, then $3 + 3 = 6 < 8$ (violates triangle inequality).', 'Nếu cạnh còn lại là $3\\text{ cm}$ thì $3 + 3 < 8$ (loại).'),
            s('Step 2: Accept $8\\text{ cm}$ and sum', 'Bước 2: Nhận $8\\text{ cm}$ và tính chu vi', 'With sides $8, 8, 3$, $3 + 8 > 8$ holds, so perimeter $= 8 + 8 + 3 = 19\\text{ cm}$.', 'Với $8; 8; 3$ thỏa $3 + 8 > 8$, chu vi bằng $19\\text{ cm}$.'),
          ],
          'The perimeter is $19\\text{ cm}$.',
          'Chu vi tam giác là $19\\text{ cm}$.'
        ),
      ],
      ['Mẹo nhanh tránh kiểm tra dài dòng: `sum of the two shorter sides > longest side`.']
    ),
    lesson(
      7, 9, 34,
      'Concurrency of the Three Medians and Three Angle Bisectors',
      'Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác',
      ['Define median and centroid ($\\frac{2}{3}$ ratio from vertex) of a triangle.', 'Define angle bisector concurrency at the incenter (equidistant from the three sides).'],
      ['Nêu định nghĩa đường trung tuyến và tính chất trọng tâm ($\\frac{2}{3}$ từ đỉnh).', 'Nêu tính chất đồng quy của ba đường phân giác (cách đều ba cạnh).'],
      [
        v('g7l34-v1', 'median / centroid', 'n', 'đường trung tuyến / trọng tâm', 'Segment joining a vertex to the opposite midpoint; all three medians meet at the centroid $G$.', 'Đoạn nối đỉnh với trung điểm cạnh đối; ba trung tuyến đồng quy tại trọng tâm $G$.', 'The centroid divides each median in a $2:1$ ratio from the vertex.', 'Trọng tâm cách mỗi đỉnh một khoảng bằng $\\frac{2}{3}$ độ dài đường trung tuyến đi qua đỉnh ấy.'),
        v('g7l34-v2', 'incenter / concurrent', 'n / adj', 'tâm đường tròn nội tiếp / đồng quy', 'Point where three angle bisectors meet, equidistant from all three sides.', 'Giao điểm ba đường phân giác, cách đều ba cạnh của tam giác.', 'Three lines passing through one single point are called concurrent.', 'Ba đường thẳng cùng đi qua một điểm gọi là đồng quy.'),
      ],
      [
        n('g7l34-n1', 'AG = \\frac{2}{3}AM', 'A G equals two thirds of median A M', 'AG bằng 2 phần 3 đường trung tuyến AM'),
      ],
      [
        e('g7l34-e1', 'describe', 'The centroid always lies inside the triangle and acts as its center of mass.', 'Trọng tâm luôn nằm bên trong tam giác.'),
        e('g7l34-e2', 'question', 'If centroid $G$ lies on median $AM$ and $AM = 12\\text{ cm}$, find $AG$ and $GM$.', 'Biết trọng tâm $G$ nằm trên trung tuyến $AM = 12\\text{ cm}$, tính $AG$ và $GM$.'),
        e('g7l34-e3', 'present', 'Using the centroid property, $AG = \\frac{2}{3} \\cdot 12 = 8\\text{ cm}$ and $GM = 4\\text{ cm}$.', 'Theo tính chất trọng tâm, $AG = 8\\text{ cm}$ và $GM = 4\\text{ cm}$.'),
      ],
      [
        ex(
          'g7l34-ex1',
          'Applying centroid ratio and bisector intersection',
          'Tính đoạn trọng tâm',
          'In $\\triangle ABC$, medians $BM$ and $CN$ intersect at $G$. Given $BG = 6\\text{ cm}$, find $BM$ and $GM$.',
          'Trong $\\triangle ABC$, hai trung tuyến $BM, CN$ cắt nhau tại $G$. Biết $BG = 6\\text{ cm}$, tính $BM$ và $GM$.',
          [
            s('Step 1: Find $BM$', 'Bước 1: Tính độ dài trung tuyến $BM$', 'Since $BG = \\frac{2}{3}BM$, $BM = 6 : \\frac{2}{3} = 9\\text{ cm}$.', 'Vì $BG = \\frac{2}{3}BM$ nên $BM = 9\\text{ cm}$.'),
            s('Step 2: Find $GM$', 'Bước 2: Tính $GM$', '$GM = BM - BG = 9 - 6 = 3\\text{ cm}$ (half of $BG$).', '$GM = 9 - 6 = 3\\text{ cm}$.'),
          ],
          '$BM = 9\\text{ cm}$ and $GM = 3\\text{ cm}$.',
          'Vậy $BM = 9\\text{ cm}$ và $GM = 3\\text{ cm}$.'
        ),
      ],
      ['Học sinh dễ nhầm `median` (trung tuyến) với `altitude` (đường cao) hoặc `midpoint` (trung điểm).']
    ),
    lesson(
      7, 9, 35,
      'Concurrency of the Three Perpendicular Bisectors and Three Altitudes',
      'Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác',
      ['Locate the circumcenter (concurrency of perpendicular bisectors, equidistant from three vertices).', 'Locate the orthocenter (concurrency of three altitudes) for acute, right, and obtuse triangles.'],
      ['Nhận biết giao điểm ba đường trung trực (cách đều ba đỉnh – tâm đường tròn ngoại tiếp).', 'Nhận biết trực tâm (giao điểm ba đường cao) ở vị trí trong, trên cạnh, ngoài tam giác.'],
      [
        v('g7l35-v1', 'circumcenter', 'n', 'tâm đường tròn ngoại tiếp', 'The intersection of the three perpendicular bisectors, equidistant from all three vertices ($OA = OB = OC$).', 'Giao điểm ba đường trung trực, cách đều ba đỉnh tam giác.', 'A water station equidistant from three villages sits at their triangle\'s circumcenter.', 'Trạm nước cách đều ba ngôi làng đặt tại giao điểm ba đường trung trực.'),
        v('g7l35-v2', 'altitude / orthocenter', 'n', 'đường cao / trực tâm', 'Perpendicular segment from a vertex to the line containing the opposite side; the three altitudes meet at the orthocenter $H$.', 'Đoạn vuông góc kẻ từ đỉnh xuống đường thẳng chứa cạnh đối; ba đường cao đồng quy tại trực tâm $H$.', 'In an obtuse triangle, the orthocenter lies outside the triangle.', 'Trong tam giác tù, trực tâm nằm bên ngoài tam giác.'),
      ],
      [
        n('g7l35-n1', 'OA = OB = OC', 'O is equidistant from vertices A, B, and C', 'O cách đều ba đỉnh A, B, C của tam giác'),
      ],
      [
        e('g7l35-e1', 'describe', 'Notice that an altitude is perpendicular to a side, whereas a perpendicular bisector is perpendicular at the midpoint and need not pass through the opposite vertex.', 'Đường cao đi qua đỉnh còn đường trung trực đi qua trung điểm của cạnh.'),
        e('g7l35-e2', 'question', 'Where is the orthocenter of a right triangle located?', 'Trực tâm của tam giác vuông nằm ở đâu?'),
        e('g7l35-e3', 'present', 'Because the two legs are altitudes themselves, the orthocenter of a right triangle coincides with the right-angle vertex.', 'Vì hai cạnh góc vuông chính là hai đường cao nên trực tâm trùng với đỉnh góc vuông.'),
      ],
      [
        ex(
          'g7l35-ex1',
          'Using Euler-style orthogonality of the orthocenter',
          'Chứng minh vuông góc bằng tính chất trực tâm',
          'In acute $\\triangle ABC$, altitudes $BD$ and $CE$ meet at $H$. Explain why $AH \\perp BC$.',
          'Cho $\\triangle ABC$ nhọn có hai đường cao $BD, CE$ cắt nhau tại $H$. Giải thích vì sao $AH \\perp BC$.',
          [
            s('Step 1: Identify $H$ as orthocenter', 'Bước 1: Xác định $H$ là trực tâm', 'Since two altitudes $BD$ and $CE$ intersect at $H$, $H$ is the orthocenter of $\\triangle ABC$.', 'Hai đường cao $BD, CE$ cắt nhau tại $H$ nên $H$ là trực tâm $\\triangle ABC$.'),
            s('Step 2: Third altitude passes through $H$', 'Bước 2: Đường cao thứ ba đi qua $H$', 'By concurrency, the line through $A$ and $H$ is the third altitude, so $AH \\perp BC$.', 'Ba đường cao đồng quy tại $H$ nên $AH$ là đường cao thứ ba, suy ra $AH \\perp BC$.'),
          ],
          'Therefore, $AH \\perp BC$.',
          'Vậy $AH \\perp BC$.'
        ),
      ],
      ['Bảng tổng kết 4 điểm đặc biệt: `Centroid` (trung tuyến), `Incenter` (phân giác), `Circumcenter` (trung trực), `Orthocenter` (đường cao).']
    ),
  ]),
  chapter(7, 10, 'Some Solid Shapes in Practice', 'Một số hình khối trong thực tiễn', [
    lesson(
      7, 10, 36,
      'Cuboid and Cube',
      'Hình hộp chữ nhật và hình lập phương',
      ['Count vertices ($8$), edges ($12$), and faces ($6$) of cuboids and cubes.', 'Compute lateral surface area, total surface area, and volume with accurate units.'],
      ['Nêu số đỉnh ($8$), số cạnh ($12$), số mặt ($6$) của hình hộp chữ nhật và hình lập phương.', 'Tính diện tích xung quanh, diện tích toàn phần và thể tích.'],
      [
        v('g7l36-v1', 'cuboid / rectangular prism', 'n phr', 'hình hộp chữ nhật', 'A $6$-faced solid where every face is a rectangle (UK: cuboid; US: rectangular prism).', 'Hình khối có $6$ mặt đều là hình chữ nhật.', 'A cuboid has $6$ faces, $12$ edges, and $8$ vertices.', 'Hình hộp chữ nhật có $6$ mặt, $12$ cạnh và $8$ đỉnh.'),
        v('g7l36-v2', 'cube', 'n', 'hình lập phương', 'A special cuboid whose six faces are congruent squares of side $a$.', 'Hình hộp chữ nhật đặc biệt có $6$ mặt là hình vuông bằng nhau cạnh $a$.', 'The volume of a cube of edge $a$ is $V = a^3$.', 'Thể tích hình lập phương cạnh $a$ là $V = a^3$.'),
        v('g7l36-v3', 'lateral surface area / volume', 'n phr', 'diện tích xung quanh / thể tích', '$S_{xq} = 2(a + b)h$ and $V = abh$.', 'Diện tích $4$ mặt bên và sức chứa của hình khối.', 'Convert cubic meters to liters using $1\\text{ dm}^3 = 1\\text{ L}$.', 'Đổi sang lít bằng $1\\text{ dm}^3 = 1$ lít.'),
      ],
      [
        n('g7l36-n1', 'S_{\\text{lat}} = 2(a + b)h, \\quad V = a \\cdot b \\cdot h', 'lateral surface area equals two times a plus b times h, and volume equals a times b times h', 'diện tích xung quanh bằng hai lần mở ngoặc a cộng b nhân h, thể tích bằng a nhân b nhân h'),
      ],
      [
        e('g7l36-e1', 'describe', 'The lateral surface area of a cuboid equals the perimeter of its base multiplied by its height.', 'Diện tích xung quanh của hình hộp chữ nhật bằng chu vi đáy nhân với chiều cao.'),
        e('g7l36-e2', 'question', 'How many square meters of paint are needed for the four walls of a $5\\text{ m} \\times 4\\text{ m} \\times 3\\text{ m}$ room?', 'Cần sơn bao nhiêu mét vuông cho bốn bức tường căn phòng kích thước $5\\text{ m} \\times 4\\text{ m} \\times 3\\text{ m}$?'),
        e('g7l36-e3', 'present', 'Computing $2(5 + 4) \\times 3$ gives $54\\text{ m}^2$.', 'Tính $2(5 + 4) \\times 3 = 54\\text{ m}^2$.'),
      ],
      [
        ex(
          'g7l36-ex1',
          'Surface area and volume of a cuboid tank',
          'Tính diện tích xung quanh và thể tích bể cá',
          'A rectangular glass tank (without a lid) has length $8\\text{ dm}$, width $5\\text{ dm}$, height $4\\text{ dm}$. Find its glass area and volume in liters.',
          'Một bể kính không nắp dài $8\\text{ dm}$, rộng $5\\text{ dm}$, cao $4\\text{ dm}$. Tính diện tích kính làm bể và thể tích tính bằng lít.',
          [
            s('Step 1: Glass area (4 sides + 1 bottom)', 'Bước 1: Diện tích kính ($S_{xq} + 1$ đáy)', '$S = 2(8 + 5)\\cdot 4 + 8 \\cdot 5 = 104 + 40 = 144\\text{ dm}^2$.', '$S = 2(8+5)\\cdot 4 + 8\\cdot 5 = 144\\text{ dm}^2$.'),
            s('Step 2: Volume', 'Bước 2: Thể tích', '$V = 8 \\cdot 5 \\cdot 4 = 160\\text{ dm}^3 = 160$ liters.', '$V = 160\\text{ dm}^3 = 160$ lít.'),
          ],
          'Glass area is $144\\text{ dm}^2$ and volume is $160$ liters.',
          'Diện tích kính là $144\\text{ dm}^2$, thể tích $160$ lít.'
        ),
      ],
      ['Lưu ý thuật ngữ: UK dùng `cuboid`, US dùng `rectangular prism`; đề bài thực tế "bể không nắp" (`open-top`) chỉ cộng $1$ mặt đáy.']
    ),
    lesson(
      7, 10, 37,
      'Right Triangular Prism and Right Quadrilateral Prism',
      'Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác',
      ['Identify bases, lateral faces (rectangles), and lateral edges of right prisms.', 'Apply $S_{xq} = C_{\\text{base}} \\cdot h$ and $V = S_{\\text{base}} \\cdot h$.'],
      ['Nhận biết hai mặt đáy song song bằng nhau và các mặt bên là hình chữ nhật.', 'Áp dụng công thức $S_{xq} = C_{\\text{đáy}} \\cdot h$ và $V = S_{\\text{đáy}} \\cdot h$.'],
      [
        v('g7l37-v1', 'right triangular prism / right quadrilateral prism', 'n phr', 'hình lăng trụ đứng tam giác / tứ giác', 'A prism whose lateral edges are perpendicular to its parallel congruent polygon bases.', 'Hình lăng trụ có các cạnh bên vuông góc với hai mặt đáy song song bằng nhau.', 'All lateral faces of a right prism are rectangles.', 'Mọi mặt bên của hình lăng trụ đứng đều là hình chữ nhật.'),
        v('g7l37-v2', 'base perimeter / base area', 'n phr', 'chu vi đáy / diện tích đáy', 'Perimeter and area of one polygonal base used in lateral area and volume formulas.', 'Chu vi và diện tích của một mặt đáy dùng để tính $S_{xq}$ và $V$.', 'Multiply the base area by the height to obtain the volume.', 'Lấy diện tích đáy nhân chiều cao để được thể tích.'),
      ],
      [
        n('g7l37-n1', 'S_{\\text{lat}} = C_{\\text{base}} \\cdot h, \\quad V = S_{\\text{base}} \\cdot h', 'lateral area equals base perimeter times height, and volume equals base area times height', 'diện tích xung quanh bằng chu vi đáy nhân chiều cao, thể tích bằng diện tích đáy nhân chiều cao'),
      ],
      [
        e('g7l37-e1', 'describe', 'Even when a tent or prism lies on a rectangular side face, its triangular faces are still its bases.', 'Dù lều trại nằm trên mặt chữ nhật, hai mặt tam giác song song vẫn là hai mặt đáy của lăng trụ đứng.'),
        e('g7l37-e2', 'question', 'How do we compute the volume of a right triangular prism?', 'Ta tính thể tích hình lăng trụ đứng tam giác bằng công thức nào?'),
        e('g7l37-e3', 'present', 'First find the triangular base area $\\frac{1}{2} \\cdot 6 \\cdot 4 = 12\\text{ cm}^2$, then multiply by height $10\\text{ cm}$ to get $120\\text{ cm}^3$.', 'Tính diện tích đáy tam giác bằng $12\\text{ cm}^2$, nhân chiều cao $10\\text{ cm}$ được $120\\text{ cm}^3$.'),
      ],
      [
        ex(
          'g7l37-ex1',
          'Volume and lateral area of a right triangular prism',
          'Tính diện tích xung quanh và thể tích lăng trụ đứng',
          'A right prism has a right-triangle base with legs $3\\text{ cm}, 4\\text{ cm}$, hypotenuse $5\\text{ cm}$, and prism height $7\\text{ cm}$. Find $S_{\\text{lat}}$ and $V$.',
          'Lăng trụ đứng có đáy là tam giác vuông cạnh góc vuông $3\\text{ cm}, 4\\text{ cm}$, cạnh huyền $5\\text{ cm}$, chiều cao $7\\text{ cm}$. Tính $S_{xq}$ và $V$.',
          [
            s('Step 1: Lateral surface area', 'Bước 1: Diện tích xung quanh', '$C_{\\text{base}} = 3 + 4 + 5 = 12\\text{ cm}$, so $S_{\\text{lat}} = 12 \\cdot 7 = 84\\text{ cm}^2$.', '$C_{\\text{đáy}} = 3 + 4 + 5 = 12\\text{ cm} \\Rightarrow S_{xq} = 12 \\cdot 7 = 84\\text{ cm}^2$.'),
            s('Step 2: Volume', 'Bước 2: Thể tích', '$S_{\\text{base}} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6\\text{ cm}^2$, so $V = 6 \\cdot 7 = 42\\text{ cm}^3$.', '$S_{\\text{đáy}} = 6\\text{ cm}^2 \\Rightarrow V = 6 \\cdot 7 = 42\\text{ cm}^3$.'),
          ],
          'Lateral area is $84\\text{ cm}^2$; volume is $42\\text{ cm}^3$.',
          'Diện tích xung quanh là $84\\text{ cm}^2$; thể tích là $42\\text{ cm}^3$.'
        ),
      ],
      ['Nhắc học sinh xác định đúng mặt đáy (hai mặt song song, bằng nhau) khi hình lăng trụ nằm ngang như chiếc lều hoặc miếng phô mai.']
    ),
  ]),
];
