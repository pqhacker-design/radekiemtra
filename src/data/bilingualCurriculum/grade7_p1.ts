import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumChapter } from './types';

export const GRADE_7_CHAPTERS_1_TO_5: CurriculumChapter[] = [
  chapter(7, 1, 'Rational Numbers', 'Số hữu tỉ', [
    lesson(
      7, 1, 1,
      'The Set of Rational Numbers',
      'Tập hợp các số hữu tỉ',
      ['Define rational numbers $\\mathbb{Q}$ as fractions $\\frac{a}{b}$ with $a, b \\in \\mathbb{Z}, b \\ne 0$.', 'Represent and compare rational numbers on a number line and identify opposite rational numbers.'],
      ['Phát biểu định nghĩa số hữu tỉ $\\mathbb{Q} = \\{\\frac{a}{b} \\mid a, b \\in \\mathbb{Z}, b \\ne 0\\}$.', 'Biểu diễn, so sánh số hữu tỉ trên trục số và tìm số đối.'],
      [
        v('g7l1-v1', 'rational number', 'n phr', 'số hữu tỉ', 'Any number that can be expressed as a fraction $\\frac{a}{b}$ where $a, b \\in \\mathbb{Z}$ and $b \\ne 0$.', 'Số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$.', 'Every integer and terminating decimal is a rational number.', 'Mọi số nguyên và số thập phân hữu hạn đều là số hữu tỉ.'),
        v('g7l1-v2', 'positive / negative rational number', 'n phr', 'số hữu tỉ dương / âm', 'Rational numbers greater than $0$ or less than $0$; $0$ is neither positive nor negative.', 'Số hữu tỉ lớn hơn $0$ hoặc nhỏ hơn $0$; số $0$ không dương cũng không âm.', '$-\\frac{3}{4}$ is a negative rational number.', '$-\\frac{3}{4}$ là một số hữu tỉ âm.'),
      ],
      [
        n('g7l1-n1', '\\mathbb{Q} = \\left\\{\\frac{a}{b} \\;\\middle|\\; a, b \\in \\mathbb{Z},\\; b \\ne 0\\right\\}', 'the set Q of rational numbers equals all fractions a over b such that a and b are integers and b is nonzero', 'tập hợp Q các số hữu tỉ gồm các phân số a phần b với a, b thuộc Z và b khác 0'),
      ],
      [
        e('g7l1-e1', 'describe', 'Every integer $n$ can be written as $\\frac{n}{1}$, so $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$.', 'Mỗi số nguyên $n$ viết được thành $\\frac{n}{1}$ nên $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$.'),
        e('g7l1-e2', 'question', 'How do we represent $-\\frac{3}{4}$ on the number line?', 'Ta biểu diễn số hữu tỉ $-\\frac{3}{4}$ trên trục số như thế nào?'),
        e('g7l1-e3', 'present', 'Divide each unit segment into $4$ equal parts and count $3$ parts to the left of $0$.', 'Chia mỗi đoạn đơn vị thành $4$ phần bằng nhau rồi lấy $3$ phần về bên trái điểm $0$.'),
      ],
      [
        ex(
          'g7l1-ex1',
          'Comparing rational numbers',
          'So sánh hai số hữu tỉ',
          'Compare $x = -0.6$ and $y = \\frac{-2}{3}$.',
          'So sánh hai số hữu tỉ $x = -0{,}6$ và $y = \\frac{-2}{3}$.',
          [
            s('Step 1: Write both as fractions', 'Bước 1: Đưa về phân số cùng mẫu dương', '$x = -0.6 = \\frac{-3}{5} = \\frac{-9}{15}$ and $y = \\frac{-2}{3} = \\frac{-10}{15}$.', '$x = -0{,}6 = \\frac{-3}{5} = \\frac{-9}{15}$ và $y = \\frac{-2}{3} = \\frac{-10}{15}$.'),
            s('Step 2: Compare numerators', 'Bước 2: So sánh tử số', 'Since $-9 > -10$, we obtain $\\frac{-9}{15} > \\frac{-10}{15}$.', 'Vì $-9 > -10$ nên $\\frac{-9}{15} > \\frac{-10}{15}$.'),
          ],
          'Hence, $-0.6 > \\frac{-2}{3}$.',
          'Vậy $-0{,}6 > \\frac{-2}{3}$.'
        ),
      ],
      ['Chữ cái $\\mathbb{Q}$ bắt nguồn từ "Quotient" (thương). Khi viết số thập phân trên lớp, nhắc học sinh dấu `.` (tiếng Anh) và `,` (tiếng Việt).']
    ),
    lesson(
      7, 1, 2,
      'Operations on Rational Numbers',
      'Cộng, trừ, nhân, chia số hữu tỉ',
      ['Perform addition, subtraction, multiplication, and division of rational numbers seamlessly across fractions and decimals.', 'Apply commutative, associative, and distributive laws to compute efficiently.'],
      ['Thực hiện cộng, trừ, nhân, chia số hữu tỉ ở dạng phân số và thập phân.', 'Vận dụng tính chất các phép tính để tính hợp lí.'],
      [
        v('g7l2-v1', 'commutative / associative / distributive laws', 'n phr', 'tính chất giao hoán / kết hợp / phân phối', 'Algebraic laws governing addition and multiplication of rational numbers.', 'Các tính chất phép tính trong tập hợp số hữu tỉ $\\mathbb{Q}$.', 'Use the distributive property to factor out $-\\frac{5}{7}$.', 'Áp dụng tính chất phân phối để đặt thừa số chung $-\\frac{5}{7}$.'),
        v('g7l2-v2', 'reciprocal', 'n', 'số nghịch đảo', 'For $x = \\frac{a}{b} \\ne 0$, its reciprocal is $\\frac{b}{a}$ so their product equals $1$.', 'Số nghịch đảo của $x = \\frac{a}{b} \\ne 0$ là $\\frac{b}{a}$.', 'Dividing by $x \\ne 0$ means multiplying by its reciprocal $\\frac{1}{x}$.', 'Chia cho $x \\ne 0$ là nhân với số nghịch đảo $\\frac{1}{x}$.'),
      ],
      [
        n('g7l2-n1', '\\frac{a}{b} \\cdot \\left(\\frac{c}{d} + \\frac{e}{f}\\right) = \\frac{a}{b}\\cdot\\frac{c}{d} + \\frac{a}{b}\\cdot\\frac{e}{f}', 'distributive property of multiplication over addition', 'tính chất phân phối của phép nhân đối với phép cộng'),
      ],
      [
        e('g7l2-e1', 'describe', 'Convert mixed numbers and decimals into fractions before multiplying or dividing.', 'Nên đổi hỗn số và số thập phân về phân số trước khi nhân chia để dễ rút gọn.'),
        e('g7l2-e2', 'question', 'Notice how $\\frac{3}{8}$ and $-\\frac{11}{8}$ share denominator $8$—can we group them first?', 'Hai phân số $\\frac{3}{8}$ và $-\\frac{11}{8}$ cùng mẫu $8$, ta nhóm chúng trước nhé?'),
        e('g7l2-e3', 'present', 'Dividing by $-0.25$ is equivalent to multiplying by $-4$.', 'Chia cho $-0{,}25$ tương đương với nhân với $-4$.'),
      ],
      [
        ex(
          'g7l2-ex1',
          'Clever computation in Q',
          'Tính hợp lí trong tập số hữu tỉ',
          'Calculate $A = \\frac{-5}{9} \\cdot \\frac{4}{11} + \\frac{-5}{9} \\cdot \\frac{7}{11} + \\frac{5}{9}$.',
          'Tính $A = \\frac{-5}{9} \\cdot \\frac{4}{11} + \\frac{-5}{9} \\cdot \\frac{7}{11} + \\frac{5}{9}$.',
          [
            s('Step 1: Factor out $-\\frac{5}{9}$', 'Bước 1: Đặt $-\\frac{5}{9}$ làm thừa số chung', 'Rewrite $+\\frac{5}{9}$ as $(-\\frac{5}{9}) \\cdot (-1)$: $A = \\frac{-5}{9} \\cdot \\left(\\frac{4}{11} + \\frac{7}{11} - 1\\right)$.', 'Viết $+\\frac{5}{9} = \\left(-\\frac{5}{9}\\right) \\cdot (-1)$, nên $A = \\frac{-5}{9} \\cdot \\left(\\frac{4}{11} + \\frac{7}{11} - 1\\right)$.'),
            s('Step 2: Simplify inside brackets', 'Bước 2: Tính tổng trong ngoặc', '$\\frac{4}{11} + \\frac{7}{11} - 1 = 1 - 1 = 0$, so $A = 0$.', '$1 - 1 = 0$, suy ra $A = 0$.'),
          ],
          'Therefore, $A = 0$.',
          'Vậy $A = 0$.'
        ),
      ],
      ['Giáo viên nên luyện tập cho học sinh nhận diện $+ \\frac{a}{b} = (-\\frac{a}{b}) \\cdot (-1)$ để đặt nhân tử chung không bị sai dấu.']
    ),
    lesson(
      7, 1, 3,
      'Powers with Natural Exponents of a Rational Number',
      'Lũy thừa với số mũ tự nhiên của một số hữu tỉ',
      ['Extend power rules to rational bases: product/quotient of same-base powers, power of a power, product, and quotient.', 'Read nested power expressions accurately in English.'],
      ['Mở rộng các công thức lũy thừa cho cơ số hữu tỉ.', 'Đọc đúng lũy thừa của lũy thừa, lũy thừa của tích và thương bằng tiếng Anh.'],
      [
        v('g7l3-v1', 'power of a power', 'n phr', 'lũy thừa của lũy thừa', 'Rule $(x^m)^n = x^{m \\cdot n}$: keep base, multiply exponents.', 'Quy tắc $(x^m)^n = x^{m \\cdot n}$: giữ nguyên cơ số, nhân hai số mũ.', 'Read $(x^2)^3$ as "x squared, all cubed" or "x to the power of two, to the power of three".', '$(x^2)^3 = x^{2 \\cdot 3} = x^6$.'),
        v('g7l3-v2', 'power of a product / quotient', 'n phr', 'lũy thừa của một tích / một thương', '$(x \\cdot y)^n = x^n \\cdot y^n$ and $\\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}$ ($y \\ne 0$).', 'Lũy thừa của tích bằng tích các lũy thừa; lũy thừa của thương bằng thương các lũy thừa.', 'Evaluate $\\left(-\\frac{2}{3}\\right)^3 = \\frac{-8}{27}$.', 'Tính $\\left(-\\frac{2}{3}\\right)^3 = \\frac{-8}{27}$.'),
      ],
      [
        n('g7l3-n1', '(x^m)^n = x^{m \\cdot n}', 'x to the m, all to the n, equals x to the m times n', 'lũy thừa bậc n của x mũ m bằng x mũ m nhân n'),
        n('g7l3-n2', '\\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}', 'open parenthesis x over y close parenthesis to the n equals x to the n over y to the n', 'mở ngoặc x phần y đóng ngoặc mũ n bằng x mũ n phần y mũ n'),
      ],
      [
        e('g7l3-e1', 'describe', 'An even power of a negative rational number is positive, whereas an odd power remains negative.', 'Lũy thừa bậc chẵn của số hữu tỉ âm là số dương, còn bậc lẻ là số âm.'),
        e('g7l3-e2', 'question', 'How can we rewrite $8^3 \\cdot 2^4$ with a common base?', 'Làm thế nào đưa $8^3 \\cdot 2^4$ về cùng một cơ số?'),
        e('g7l3-e3', 'present', 'Since $8 = 2^3$, we get $(2^3)^3 \\cdot 2^4 = 2^9 \\cdot 2^4 = 2^{13}$.', 'Vì $8 = 2^3$ nên $(2^3)^3 \\cdot 2^4 = 2^9 \\cdot 2^4 = 2^{13}$.'),
      ],
      [
        ex(
          'g7l3-ex1',
          'Simplifying rational powers',
          'Rút gọn biểu thức lũy thừa số hữu tỉ',
          'Simplify $B = \\frac{4^5 \\cdot 9^4}{2^9 \\cdot 3^8}$.',
          'Rút gọn $B = \\frac{4^5 \\cdot 9^4}{2^9 \\cdot 3^8}$.',
          [
            s('Step 1: Factor bases into primes', 'Bước 1: Đưa cơ số về số nguyên tố $2$ và $3$', '$4^5 = (2^2)^5 = 2^{10}$ and $9^4 = (3^2)^4 = 3^8$.', '$4^5 = (2^2)^5 = 2^{10}$ và $9^4 = (3^2)^4 = 3^8$.'),
            s('Step 2: Cancel common factors', 'Bước 2: Chia các lũy thừa cùng cơ số', '$B = \\frac{2^{10} \\cdot 3^8}{2^9 \\cdot 3^8} = 2^{10-9} \\cdot 1 = 2$.', '$B = \\frac{2^{10} \\cdot 3^8}{2^9 \\cdot 3^8} = 2$.'),
          ],
          'The simplified value is $B = 2$.',
          'Kết quả rút gọn là $B = 2$.'
        ),
      ],
      ['Luôn nhắc học sinh phân biệt $(-3)^2 = 9$ và $-3^2 = -9$ ("parentheses matter!").']
    ),
    lesson(
      7, 1, 4,
      'Order of Operations and Bracket Rules',
      'Thứ tự thực hiện các phép tính. Quy tắc chuyển vế',
      ['Evaluate expressions with rational numbers and powers following order of operations.', 'Apply the transposition rule (chuyển vế đổi dấu) to solve linear equations in $x$.'],
      ['Tính đúng giá trị biểu thức số hữu tỉ theo thứ tự phép tính.', 'Vận dụng quy tắc chuyển vế đổi dấu để tìm $x$.'],
      [
        v('g7l4-v1', 'transposition rule / transpose a term', 'n phr / v phr', 'quy tắc chuyển vế / chuyển vế', 'Moving a term from one side of an equality to the other reverses its sign: $a + b = c \\Rightarrow a = c - b$.', 'Khi chuyển một số hạng từ vế này sang vế kia của đẳng thức, ta phải đổi dấu số hạng đó.', 'Transpose $\\frac{1}{3}$ to the right-hand side and change its sign.', 'Chuyển $\\frac{1}{3}$ sang vế phải và đổi dấu thành $-\\frac{1}{3}$.'),
        v('g7l4-v2', 'left-hand side (LHS) / right-hand side (RHS)', 'n phr', 'vế trái / vế phải', 'The expressions to the left and right of the equals sign.', 'Biểu thức bên trái và bên phải dấu bằng.', 'Isolate $x$ on the left-hand side.', 'Cô lập ẩn $x$ ở vế trái.'),
      ],
      [
        n('g7l4-n1', 'x + a = b \\Rightarrow x = b - a', 'if x plus a equals b, transposing a gives x equals b minus a', 'nếu x cộng a bằng b thì chuyển vế ta được x bằng b trừ a'),
      ],
      [
        e('g7l4-e1', 'describe', 'Whenever a term crosses the equals sign, flip its sign from plus to minus or minus to plus.', 'Mỗi khi chuyển một số hạng qua dấu bằng, phải đổi dấu cộng thành trừ hoặc trừ thành cộng.'),
        e('g7l4-e2', 'question', 'Should we evaluate inside the parentheses first or expand?', 'Ta nên tính trong ngoặc trước hay phá ngoặc trước cho nhanh hơn?'),
        e('g7l4-e3', 'present', 'Transposing $-\\frac{2}{5}$ to the RHS gives $\\frac{3}{4}x = \\frac{7}{10} + \\frac{2}{5} = \\frac{11}{10}$.', 'Chuyển $-\\frac{2}{5}$ sang vế phải ta được $\\frac{3}{4}x = \\frac{11}{10}$.'),
      ],
      [
        ex(
          'g7l4-ex1',
          'Solving for x using transposition',
          'Tìm x bằng quy tắc chuyển vế',
          'Find $x$ given $\\frac{2}{3}x - \\frac{1}{2} = \\frac{5}{6}$.',
          'Tìm $x$ biết $\\frac{2}{3}x - \\frac{1}{2} = \\frac{5}{6}$.',
          [
            s('Step 1: Transpose $-\\frac{1}{2}$', 'Bước 1: Chuyển vế $-\\frac{1}{2}$', '$\\frac{2}{3}x = \\frac{5}{6} + \\frac{1}{2} = \\frac{5}{6} + \\frac{3}{6} = \\frac{4}{3}$.', '$\\frac{2}{3}x = \\frac{5}{6} + \\frac{1}{2} = \\frac{4}{3}$.'),
            s('Step 2: Divide by $\\frac{2}{3}$', 'Bước 2: Chia cho $\\frac{2}{3}$', '$x = \\frac{4}{3} : \\frac{2}{3} = \\frac{4}{3} \\cdot \\frac{3}{2} = 2$.', '$x = \\frac{4}{3} : \\frac{2}{3} = 2$.'),
          ],
          'So $x = 2$.',
          'Vậy $x = 2$.'
        ),
      ],
      ['Từ khóa tiếng Anh rất tự nhiên: `transpose`, `move ... to the other side and flip its sign`, `LHS`, `RHS`.']
    ),
  ]),
  chapter(7, 2, 'Real Numbers', 'Số thực', [
    lesson(
      7, 2, 5,
      'Familiarizing with Infinite Repeating Decimals',
      'Làm quen với số thập phân vô hạn tuần hoàn',
      ['Distinguish terminating decimals from infinite repeating decimals.', 'Read repeating cycle notation like $0.(3)$ or $0.\\overline{3}$.'],
      ['Phân biệt số thập phân hữu hạn và số thập phân vô hạn tuần hoàn.', 'Đọc kí hiệu chu kì lặp lại như $0,(3)$ hay $0.\\overline{3}$.'],
      [
        v('g7l5-v1', 'terminating decimal', 'n phr', 'số thập phân hữu hạn', 'A decimal with finitely many digits after the decimal point (e.g., $0.25$).', 'Số thập phân có hữu hạn chữ số sau dấu phẩy.', 'If a reduced fraction denominator has only prime factors $2$ and $5$, it gives a terminating decimal.', 'Phân số tối giản mà mẫu chỉ có ước nguyên tố $2$ và $5$ thì viết được thành số thập phân hữu hạn.'),
        v('g7l5-v2', 'infinite repeating decimal / recurring decimal', 'n phr', 'số thập phân vô hạn tuần hoàn', 'A decimal in which a block of digits repeats endlessly, called the repeating period.', 'Số thập phân có một nhóm chữ số sau dấu phẩy lặp lại vô tận (chu kì).', '$\\frac{1}{3} = 0.(3)$ is a repeating decimal with period $3$.', '$\\frac{1}{3} = 0,(3)$ là số thập phân vô hạn tuần hoàn chu kì $3$.'),
      ],
      [
        n('g7l5-n1', '0.(18) \\text{ or } 0.\\overline{18}', 'zero point one eight repeating', 'không phẩy một tám tuần hoàn chu kì 18', 'Vietnamese writes $0,(18)$; English often uses a vinculum bar $0.\\overline{18}$.', 'Việt Nam viết chu kì trong ngoặc $0,(18)$; quốc tế thường gạch ngang trên đầu $0.\\overline{18}$.'),
      ],
      [
        e('g7l5-e1', 'describe', 'Every rational number can be written as either a terminating or an infinite repeating decimal.', 'Mỗi số hữu tỉ đều biểu diễn được dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn.'),
        e('g7l5-e2', 'question', 'Does $\\frac{7}{20}$ convert to a terminating decimal or a repeating decimal?', 'Phân số $\\frac{7}{20}$ viết được thành số thập phân hữu hạn hay vô hạn tuần hoàn?'),
        e('g7l5-e3', 'present', 'Since $20 = 2^2 \\cdot 5$ has no prime factors other than $2$ and $5$, $\\frac{7}{20} = 0.35$ terminates.', 'Vì $20 = 2^2 \\cdot 5$ chỉ có ước nguyên tố $2$ và $5$ nên $\\frac{7}{20} = 0{,}35$ là số thập phân hữu hạn.'),
      ],
      [
        ex(
          'g7l5-ex1',
          'Identifying repeating periods and rounding',
          'Nhận biết chu kì và làm tròn số thập phân vô hạn tuần hoàn',
          'Write $\\frac{5}{12}$ as a repeating decimal and round it to the nearest hundredth.',
          'Viết $\\frac{5}{12}$ dưới dạng số thập phân vô hạn tuần hoàn và làm tròn đến hàng phần trăm.',
          [
            s('Step 1: Divide $5$ by $12$', 'Bước 1: Chia $5$ cho $12$', '$5 : 12 = 0.41666\\dots = 0.41(6)$.', '$5 : 12 = 0{,}41666\\dots = 0{,}41(6)$.'),
            s('Step 2: Round to hundredths', 'Bước 2: Làm tròn đến hàng phần trăm', 'The thousandths digit is $6 \\ge 5$, so round up to $0.42$.', 'Chữ số hàng phần nghìn là $6 \\ge 5$ nên làm tròn thành $0{,}42$.'),
          ],
          '$\\frac{5}{12} = 0.41(6) \\approx 0.42$.',
          '$\\frac{5}{12} = 0{,}41(6) \\approx 0{,}42$.'
        ),
      ],
      ['Chú ý đối chiếu hai kí hiệu: $0,(3)$ (Việt Nam) và $0.\\overline{3}$ hoặc $0.\\dot{3}$ (Anh/Mỹ).']
    ),
    lesson(
      7, 2, 6,
      'Irrational Numbers and Arithmetic Square Roots',
      'Số vô tỉ. Căn bậc hai số học',
      ['Identify irrational numbers as infinite non-repeating decimals (such as $\\sqrt{2}$ and $\\pi$).', 'Define and compute the arithmetic square root $\\sqrt{a}$ for $a \\ge 0$.'],
      ['Nhận biết số vô tỉ là số thập phân vô hạn không tuần hoàn.', 'Hiểu định nghĩa và tính được căn bậc hai số học $\\sqrt{a}$ ($a \\ge 0$).'],
      [
        v('g7l6-v1', 'irrational number', 'n phr', 'số vô tỉ', 'A number written as an infinite non-repeating decimal, not expressible as $\\frac{a}{b}$.', 'Số viết được dưới dạng số thập phân vô hạn không tuần hoàn.', '$\\sqrt{2} = 1.4142135\\dots$ and $\\pi$ are irrational numbers.', '$\\sqrt{2}$ và $\\pi$ là các số vô tỉ.'),
        v('g7l6-v2', 'arithmetic square root / principal square root', 'n phr', 'căn bậc hai số học', 'For $a \\ge 0$, the non-negative number $x$ satisfying $x^2 = a$, written $\\sqrt{a}$.', 'Với $a \\ge 0$, số không âm $x$ sao cho $x^2 = a$, kí hiệu $\\sqrt{a}$.', 'The arithmetic square root of $25$ is $\\sqrt{25} = 5$.', 'Căn bậc hai số học của $25$ là $\\sqrt{25} = 5$.'),
      ],
      [
        n('g7l6-n1', '\\sqrt{a} = x \\;(x \\ge 0,\\; x^2 = a)', 'the square root of a equals x, where x is non-negative and x squared equals a', 'căn bậc hai số học của a bằng x, với x không âm và x bình phương bằng a'),
      ],
      [
        e('g7l6-e1', 'describe', 'Negative numbers do not have an arithmetic square root in the real numbers.', 'Số âm không có căn bậc hai số học trong tập số thực.'),
        e('g7l6-e2', 'question', 'What is the side length of a square whose area is $81\\text{ cm}^2$?', 'Độ dài cạnh của hình vuông có diện tích $81\\text{ cm}^2$ là bao nhiêu?'),
        e('g7l6-e3', 'present', 'Since $9 > 0$ and $9^2 = 81$, the side length is $\\sqrt{81} = 9\\text{ cm}$.', 'Vì $9 > 0$ và $9^2 = 81$ nên cạnh hình vuông là $\\sqrt{81} = 9\\text{ cm}$.'),
      ],
      [
        ex(
          'g7l6-ex1',
          'Computing arithmetic square roots',
          'Tính căn bậc hai số học',
          'Evaluate $\\sqrt{144}$, $\\sqrt{\\frac{9}{16}}$, and $\\sqrt{(-7)^2}$.',
          'Tính $\\sqrt{144}$, $\\sqrt{\\frac{9}{16}}$ và $\\sqrt{(-7)^2}$.',
          [
            s('Step 1: Evaluate $\\sqrt{144}$ and $\\sqrt{\\frac{9}{16}}$', 'Bước 1: Tính hai căn đầu', '$12^2 = 144 \\Rightarrow \\sqrt{144} = 12$; $\\left(\\frac{3}{4}\\right)^2 = \\frac{9}{16} \\Rightarrow \\sqrt{\\frac{9}{16}} = \\frac{3}{4}$.', '$\\sqrt{144} = 12$; $\\sqrt{\\frac{9}{16}} = \\frac{3}{4}$.'),
            s('Step 2: Watch the sign in $\\sqrt{(-7)^2}$', 'Bước 2: Chú ý dấu trong $\\sqrt{(-7)^2}$', '$(-7)^2 = 49$, and the arithmetic square root must be non-negative, so $\\sqrt{49} = 7$.', '$(-7)^2 = 49$, căn bậc hai số học luôn không âm nên $\\sqrt{49} = 7$.'),
          ],
          'Values are $12$, $\\frac{3}{4}$, and $7$ (never $-7$).',
          'Kết quả lần lượt là $12$, $\\frac{3}{4}$ và $7$ (không phải $-7$).'
        ),
      ],
      ['Cảnh báo lỗi kinh điển: $\\sqrt{(-7)^2} = 7$, không bao giờ bằng $-7$ vì $\\sqrt{a} \\ge 0$ luôn luôn.']
    ),
    lesson(
      7, 2, 7,
      'The Set of Real Numbers and Absolute Value',
      'Tập hợp các số thực',
      ['Understand $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$ and the one-to-one correspondence with points on the real line.', 'Compute the absolute value $|x|$ of a real number and solve $|x| = a$.'],
      ['Hiểu tập số thực $\\mathbb{R}$ gồm số hữu tỉ và số vô tỉ, lấp đầy trục số.', 'Tính giá trị tuyệt đối $|x|$ của một số thực và tìm $x$ từ $|x| = a$.'],
      [
        v('g7l7-v1', 'real number ($\\mathbb{R}$)', 'n phr', 'số thực', 'Any rational or irrational number; every point on the number line represents a unique real number.', 'Số hữu tỉ hoặc số vô tỉ; mỗi điểm trên trục số biểu diễn đúng một số thực.', 'Both $-\\frac{1}{2}$ and $\\sqrt{3}$ belong to $\\mathbb{R}$.', 'Cả $-\\frac{1}{2}$ và $\\sqrt{3}$ đều thuộc $\\mathbb{R}$.'),
        v('g7l7-v2', 'absolute value', 'n phr', 'giá trị tuyệt đối', 'The distance from $0$ to $x$ on the number line: $|x| = x$ if $x \\ge 0$, and $-x$ if $x < 0$.', 'Khoảng cách từ điểm $x$ đến điểm $0$ trên trục số.', 'The absolute value of $-4.5$ is $|-4.5| = 4.5$.', 'Giá trị tuyệt đối của $-4{,}5$ là $|-4{,}5| = 4{,}5$.'),
      ],
      [
        n('g7l7-n1', '|x| = a \\;(a > 0) \\Leftrightarrow x = a \\text{ or } x = -a', 'the absolute value of x equals a if and only if x equals a or x equals negative a', 'giá trị tuyệt đối của x bằng a khi và chỉ khi x bằng a hoặc x bằng âm a'),
      ],
      [
        e('g7l7-e1', 'describe', 'The absolute value of any real number is always non-negative: $|x| \\ge 0$.', 'Giá trị tuyệt đối của một số thực bất kì luôn không âm: $|x| \\ge 0$.'),
        e('g7l7-e2', 'question', 'How many real numbers satisfy $|x| = 3.5$?', 'Có bao nhiêu số thực $x$ thỏa mãn $|x| = 3{,}5$?'),
        e('g7l7-e3', 'present', 'Since $|-\\sqrt{5}| = \\sqrt{5} \\approx 2.24$, its distance from the origin is $\\sqrt{5}$.', 'Vì $|-\\sqrt{5}| = \\sqrt{5}$, khoảng cách từ điểm $-\\sqrt{5}$ đến gốc $0$ là $\\sqrt{5}$.'),
      ],
      [
        ex(
          'g7l7-ex1',
          'Solving an absolute value equation',
          'Tìm x chứa giá trị tuyệt đối',
          'Find all real numbers $x$ such that $|x - 2| = 5$.',
          'Tìm các số thực $x$ thỏa mãn $|x - 2| = 5$.',
          [
            s('Step 1: Split into two cases', 'Bước 1: Chia hai trường hợp', 'Either $x - 2 = 5$ or $x - 2 = -5$.', 'Hoặc $x - 2 = 5$ hoặc $x - 2 = -5$.'),
            s('Step 2: Solve each equation', 'Bước 2: Giải từng trường hợp', '$x = 7$ or $x = -3$.', '$x = 7$ hoặc $x = -3$.'),
          ],
          'The solutions are $x = 7$ and $x = -3$.',
          'Các giá trị cần tìm là $x = 7$ hoặc $x = -3$.'
        ),
      ],
      ['Từ khóa trực quan cho $|x|$ là "distance from zero on the number line" (luôn dương hoặc bằng $0$).']
    ),
  ]),
  chapter(7, 3, 'Angles and Parallel Lines', 'Góc và đường thẳng song song', [
    lesson(
      7, 3, 8,
      'Angles in Special Positions and Angle Bisectors',
      'Góc ở vị trí đặc biệt. Tia phân giác của một góc',
      ['Identify adjacent angles, linear pairs (supplementary adjacent), and vertical angles.', 'Define the angle bisector and compute split angle measures.'],
      ['Nhận biết hai góc kề nhau, kề bù và hai góc đối đỉnh.', 'Phát biểu định nghĩa tia phân giác và tính số đo góc liên quan.'],
      [
        v('g7l8-v1', 'adjacent / linear pair (adjacent supplementary)', 'n phr', 'hai góc kề nhau / hai góc kề bù', 'Adjacent angles share a vertex and a common side; a linear pair sums to $180^\\circ$.', 'Hai góc chung đỉnh chung cạnh không có điểm trong chung; hai góc kề bù có tổng bằng $180^\\circ$.', 'Angles in a linear pair sum to $180^\\circ$.', 'Hai góc kề bù có tổng số đo bằng $180^\\circ$.'),
        v('g7l8-v2', 'vertical angles / vertically opposite angles', 'n phr', 'hai góc đối đỉnh', 'Opposite angles formed by two intersecting lines; they always have equal measures.', 'Hai góc mà mỗi cạnh của góc này là tia đối của một cạnh góc kia; chúng bằng nhau.', 'Vertical angles are always equal.', 'Hai góc đối đỉnh thì bằng nhau.'),
        v('g7l8-v3', 'angle bisector', 'n phr', 'tia phân giác của một góc', 'A ray inside an angle dividing it into two equal angles.', 'Tia nằm giữa hai cạnh của góc và tạo với hai cạnh ấy hai góc bằng nhau.', 'If $Oz$ is the angle bisector of $\\angle xOy$, then $\\angle xOz = \\angle zOy = \\frac{1}{2}\\angle xOy$.', 'Nếu $Oz$ là phân giác của $\\widehat{xOy}$ thì $\\widehat{xOz} = \\widehat{zOy} = \\frac{1}{2}\\widehat{xOy}$.'),
      ],
      [
        n('g7l8-n1', '\\widehat{xOz} + \\widehat{zOy} = 180^\\circ', 'angle x O z plus angle z O y equals one hundred eighty degrees', 'góc x O z cộng góc z O y bằng 180 độ'),
      ],
      [
        e('g7l8-e1', 'describe', 'Two intersecting lines form two pairs of equal vertical angles and four linear pairs.', 'Hai đường thẳng cắt nhau tạo thành hai cặp góc đối đỉnh bằng nhau và bốn cặp góc kề bù.'),
        e('g7l8-e2', 'question', 'If two angles form a linear pair and one measures $65^\\circ$, what is the other angle?', 'Nếu hai góc kề bù và một góc bằng $65^\\circ$ thì góc kia bằng bao nhiêu?'),
        e('g7l8-e3', 'present', 'Since $Om$ bisects $\\angle xOy = 110^\\circ$, we have $\\angle xOm = 55^\\circ$.', 'Vì $Om$ là tia phân giác của $\\widehat{xOy} = 110^\\circ$ nên $\\widehat{xOm} = 55^\\circ$.'),
      ],
      [
        ex(
          'g7l8-ex1',
          'Combining linear pairs and angle bisector',
          'Kết hợp góc kề bù và tia phân giác',
          'Angles $\\angle xOy$ and $\\angle yOz$ form a linear pair with $\\angle xOy = 70^\\circ$. Let $Ot$ bisect $\\angle yOz$. Find $\\angle yOt$.',
          'Hai góc $\\widehat{xOy}$ và $\\widehat{yOz}$ kề bù, biết $\\widehat{xOy} = 70^\\circ$. Vẽ $Ot$ là phân giác $\\widehat{yOz}$. Tính $\\widehat{yOt}$.',
          [
            s('Step 1: Find $\\angle yOz$', 'Bước 1: Tính $\\widehat{yOz}$', '$\\angle yOz = 180^\\circ - 70^\\circ = 110^\\circ$ (linear pair).', '$\\widehat{yOz} = 180^\\circ - 70^\\circ = 110^\\circ$ (kề bù).'),
            s('Step 2: Apply angle bisector', 'Bước 2: Áp dụng tia phân giác', '$\\angle yOt = \\frac{110^\\circ}{2} = 55^\\circ$.', '$\\widehat{yOt} = \\frac{110^\\circ}{2} = 55^\\circ$.'),
          ],
          'Thus, $\\angle yOt = 55^\\circ$.',
          'Vậy $\\widehat{yOt} = 55^\\circ$.'
        ),
      ],
      ['Tiếng Anh Mỹ gọi góc đối đỉnh là `vertical angles`, tiếng Anh Anh là `vertically opposite angles`.']
    ),
    lesson(
      7, 3, 9,
      'Parallel Lines and Identification Signs',
      'Hai đường thẳng song song và dấu hiệu nhận biết',
      ['Identify corresponding angles and alternate interior angles formed by a transversal.', 'Prove two lines are parallel using equal alternate interior or corresponding angles.'],
      ['Nhận biết cặp góc đồng vị và góc so le trong tạo bởi đường thẳng cắt hai đường thẳng.', 'Chứng minh hai đường thẳng song song bằng dấu hiệu góc bằng nhau.'],
      [
        v('g7l9-v1', 'transversal', 'n', 'đường thẳng cắt (cát tuyến)', 'A line intersecting two or more other lines at distinct points.', 'Một đường thẳng cắt hai đường thẳng khác.', 'Line $c$ is a transversal cutting lines $a$ and $b$.', 'Đường thẳng $c$ cắt hai đường thẳng $a$ và $b$.'),
        v('g7l9-v2', 'alternate interior angles', 'n phr', 'hai góc so le trong', 'A pair of interior angles lying on opposite sides of the transversal.', 'Hai góc nằm bên trong hai đường thẳng và ở hai phía khác nhau của cát tuyến.', 'If alternate interior angles are equal, the lines are parallel.', 'Nếu hai góc so le trong bằng nhau thì hai đường thẳng song song.'),
        v('g7l9-v3', 'corresponding angles', 'n phr', 'hai góc đồng vị', 'A pair of angles occupying the same relative position at each intersection.', 'Hai góc ở vị trí giống nhau tại hai giao điểm.', 'If corresponding angles are equal, then $a \\parallel b$.', 'Nếu hai góc đồng vị bằng nhau thì $a \\parallel b$.'),
      ],
      [
        n('g7l9-n1', '\\widehat{A_1} = \\widehat{B_3} \\;(\\text{alt. int.}) \\Rightarrow a \\parallel b', 'equal alternate interior angles imply a is parallel to b', 'hai góc so le trong bằng nhau suy ra a song song b'),
      ],
      [
        e('g7l9-e1', 'describe', 'When a transversal creates equal alternate interior angles or equal corresponding angles, the two lines are parallel.', 'Nếu một đường thẳng cắt hai đường thẳng mà tạo ra một cặp góc so le trong bằng nhau hoặc một cặp góc đồng vị bằng nhau thì hai đường thẳng đó song song.'),
        e('g7l9-e2', 'question', 'Which angle forms an alternate interior pair with $\\angle A_4$?', 'Góc nào tạo với $\\widehat{A_4}$ thành một cặp góc so le trong?'),
        e('g7l9-e3', 'present', 'Because the two corresponding angles both measure $65^\\circ$, lines $a$ and $b$ are parallel.', 'Vì hai góc đồng vị đều bằng $65^\\circ$ nên $a \\parallel b$.'),
      ],
      [
        ex(
          'g7l9-ex1',
          'Proving two lines parallel',
          'Chứng minh hai đường thẳng song song',
          'A transversal $c$ meets $a$ at $A$ and $b$ at $B$ such that alternate interior angles $\\angle A_1 = 120^\\circ$ and $\\angle B_3 = 120^\\circ$. Show $a \\parallel b$.',
          'Đường thẳng $c$ cắt $a, b$ tại $A, B$ có cặp góc so le trong $\\widehat{A_1} = \\widehat{B_3} = 120^\\circ$. Chứng minh $a \\parallel b$.',
          [
            s('Step 1: State angle equality', 'Bước 1: Chỉ ra hai góc bằng nhau', 'We have $\\angle A_1 = \\angle B_3 = 120^\\circ$.', 'Ta có $\\widehat{A_1} = \\widehat{B_3} = 120^\\circ$.'),
            s('Step 2: State position and conclude', 'Bước 2: Nêu vị trí và kết luận', 'Since these angles are in alternate interior positions, $a \\parallel b$.', 'Mà hai góc này ở vị trí so le trong nên $a \\parallel b$.'),
          ],
          'Therefore, $a \\parallel b$.',
          'Vậy $a \\parallel b$.'
        ),
      ],
      ['Dùng chữ cái Z để nhớ `alternate interior angles` và chữ cái F để nhớ `corresponding angles`.']
    ),
    lesson(
      7, 3, 10,
      'Euclid\'s Postulate and Properties of Parallel Lines',
      'Tiên đề Euclid. Tính chất của hai đường thẳng song song',
      ['State Euclid\'s parallel postulate in English and Vietnamese.', 'Deduce angle measures when given $a \\parallel b$ and combine perpendicular/parallel properties.'],
      ['Phát biểu tiên đề Euclid về đường thẳng song song.', 'Tính số đo góc khi biết $a \\parallel b$ và liên hệ giữa vuông góc với song song.'],
      [
        v('g7l10-v1', 'Euclid\'s parallel postulate', 'n phr', 'tiên đề Euclid', 'Through a point outside a given line, there is only one line parallel to that line.', 'Qua một điểm ở ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.', 'By Euclid\'s postulate, any two lines through $M$ parallel to $a$ must coincide.', 'Theo tiên đề Euclid, hai đường qua $M$ cùng song song với $a$ thì trùng nhau.'),
        v('g7l10-v2', 'co-interior / consecutive interior angles', 'n phr', 'hai góc trong cùng phía', 'Interior angles on the same side of the transversal; when lines are parallel, they are supplementary ($180^\\circ$).', 'Hai góc trong cùng một phía của cát tuyến; khi hai đường song song thì tổng bằng $180^\\circ$.', 'If $a \\parallel b$, consecutive interior angles sum to $180^\\circ$.', 'Nếu $a \\parallel b$ thì hai góc trong cùng phía bù nhau.'),
      ],
      [
        n('g7l10-n1', 'a \\perp c, \\; b \\perp c \\Rightarrow a \\parallel b', 'if a is perpendicular to c and b is perpendicular to c, then a is parallel to b', 'a vuông góc với c và b vuông góc với c thì suy ra a song song với b'),
      ],
      [
        e('g7l10-e1', 'describe', 'If a line cuts two parallel lines, then alternate interior angles are equal and corresponding angles are equal.', 'Một đường thẳng cắt hai đường thẳng song song thì các góc so le trong bằng nhau, các góc đồng vị bằng nhau.'),
        e('g7l10-e2', 'question', 'If $a \\parallel b$ and $c \\perp a$, what is the relation between $c$ and $b$?', 'Nếu $a \\parallel b$ và $c \\perp a$ thì quan hệ giữa $c$ và $b$ là gì?'),
        e('g7l10-e3', 'present', 'Because $a \\parallel b$, the alternate interior angles are equal, giving $x = 52^\\circ$.', 'Vì $a \\parallel b$ nên hai góc so le trong bằng nhau, suy ra $x = 52^\\circ$.'),
      ],
      [
        ex(
          'g7l10-ex1',
          'Computing angles using parallel lines',
          'Tính góc nhờ hai đường thẳng song song',
          'Given $a \\parallel b$ cut by $c$ at $A, B$ with interior angle $\\angle A_2 = 115^\\circ$, find its co-interior partner $\\angle B_1$.',
          'Cho $a \\parallel b$ bị cát tuyến $c$ cắt tại $A, B$, biết $\\widehat{A_2} = 115^\\circ$. Tính góc trong cùng phía $\\widehat{B_1}$.',
          [
            s('Step 1: Identify relationship', 'Bước 1: Xác định quan hệ hai góc', 'Since $a \\parallel b$, the co-interior angles $\\angle A_2$ and $\\angle B_1$ sum to $180^\\circ$.', 'Vì $a \\parallel b$ nên hai góc trong cùng phía bù nhau: $\\widehat{A_2} + \\widehat{B_1} = 180^\\circ$.'),
            s('Step 2: Subtract', 'Bước 2: Tính $\\widehat{B_1}$', '$\\angle B_1 = 180^\\circ - 115^\\circ = 65^\\circ$.', '$\\widehat{B_1} = 180^\\circ - 115^\\circ = 65^\\circ$.'),
          ],
          'So $\\angle B_1 = 65^\\circ$.',
          'Vậy $\\widehat{B_1} = 65^\\circ$.'
        ),
      ],
      ['Phân biệt rành mạch chiều thuận (Dấu hiệu nhận biết $\\to$ chứng minh song song) và chiều đảo (Tính chất $\\to$ có song song để suy ra góc).']
    ),
    lesson(
      7, 3, 11,
      'Theorems and Proving a Theorem',
      'Định lí và chứng minh định lí',
      ['Identify the hypothesis (Given / If) and conclusion (To prove / Then) of a theorem.', 'Write a short deductive geometric proof with clear logical steps.'],
      ['Phân biệt phần giả thiết (GT) và kết luận (KL) của một định lí.', 'Trình bày chứng minh định lí ngắn gọn, chặt chẽ.'],
      [
        v('g7l11-v1', 'theorem / hypothesis / conclusion', 'n', 'định lí / giả thiết / kết luận', 'A true mathematical statement established by reasoning from Given (hypothesis) to Conclusion.', 'Khẳng định suy ra từ những khẳng định đúng trước đó, gồm Giả thiết và Kết luận.', 'In "If $a \\parallel c$ and $b \\parallel c$, then $a \\parallel b$", "$a \\parallel c, b \\parallel c$" is the hypothesis.', 'Trong định lí trên, "$a \\parallel c, b \\parallel c$" là giả thiết.'),
        v('g7l11-v2', 'proof / deduce', 'n / v', 'chứng minh / suy ra', 'A logical sequence of steps justifying why the conclusion follows from the hypothesis.', 'Chuỗi lập luận hợp lôgic để khẳng định kết luận đúng từ giả thiết.', 'Prove the theorem step by step.', 'Chứng minh định lí theo từng bước.'),
      ],
      [
        n('g7l11-n1', '\\text{Given (GT)} \\Rightarrow \\text{Prove (KL)}', 'from the given hypothesis, we prove the conclusion', 'từ giả thiết, chứng minh kết luận'),
      ],
      [
        e('g7l11-e1', 'describe', 'When a theorem is stated in "If ..., then ..." form, the "If" clause is the hypothesis and the "then" clause is the conclusion.', 'Khi định lí viết dạng "Nếu ... thì ...", phần sau "Nếu" là giả thiết, phần sau "thì" là kết luận.'),
        e('g7l11-e2', 'question', 'State the hypothesis and conclusion of the vertical angles theorem.', 'Hãy chỉ ra giả thiết và kết luận của định lí hai góc đối đỉnh.'),
        e('g7l11-e3', 'present', 'By definition of linear pairs, $\\angle O_1 + \\angle O_2 = 180^\\circ$ and $\\angle O_3 + \\angle O_2 = 180^\\circ$, hence $\\angle O_1 = \\angle O_3$.', 'Theo tính chất kề bù, $\\widehat{O_1} + \\widehat{O_2} = 180^\\circ$ và $\\widehat{O_3} + \\widehat{O_2} = 180^\\circ$, suy ra $\\widehat{O_1} = \\widehat{O_3}$.'),
      ],
      [
        ex(
          'g7l11-ex1',
          'Structuring GT – KL and a proof',
          'Viết GT – KL và chứng minh định lí',
          'Prove: If two lines $a, b$ are both perpendicular to line $c$, then $a \\parallel b$.',
          'Chứng minh định lí: Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song với nhau.',
          [
            s('Step 1: State Given / Prove', 'Bước 1: Ghi giả thiết và kết luận', 'Given: $a \\perp c$ at $A$, $b \\perp c$ at $B$ ($a \\ne b$). Prove: $a \\parallel b$.', 'GT: $a \\perp c$ tại $A$, $b \\perp c$ tại $B$. KL: $a \\parallel b$.'),
            s('Step 2: Deductive proof', 'Bước 2: Lập luận chứng minh', 'Choose a pair of corresponding angles $\\angle A_1$ and $\\angle B_1$. Since $a \\perp c$ and $b \\perp c$, $\\angle A_1 = \\angle B_1 = 90^\\circ$. Therefore $a \\parallel b$.', 'Có cặp góc đồng vị $\\widehat{A_1} = \\widehat{B_1} = 90^\\circ$ nên suy ra $a \\parallel b$.'),
          ],
          'The theorem is proved.',
          'Định lí đã được chứng minh.'
        ),
      ],
      ['Dạy học sinh mẫu viết song ngữ `Given:` (GT) và `To prove:` (KL) để làm quen với chứng minh hình học quốc tế.']
    ),
  ]),
  chapter(7, 4, 'Congruent Triangles', 'Tam giác bằng nhau', [
    lesson(
      7, 4, 12,
      'Sum of Angles in a Triangle',
      'Tổng các góc trong một tam giác',
      ['State and apply the triangle angle-sum theorem ($\angle A + \angle B + \angle C = 180^\\circ$).', 'Define exterior angles of a triangle and classify acute, right, and obtuse triangles.'],
      ['Phát biểu và vận dụng định lí tổng ba góc của tam giác bằng $180^\\circ$.', 'Nhận biết góc ngoài tam giác và phân loại tam giác nhọn, vuông, tù.'],
      [
        v('g7l12-v1', 'acute / right / obtuse triangle', 'n phr', 'tam giác nhọn / tam giác vuông / tam giác tù', 'Triangles with three acute angles, one right angle ($90^\\circ$), or one obtuse angle.', 'Tam giác có ba góc nhọn, một góc vuông, hoặc một góc tù.', 'In a right triangle, the two acute angles are complementary (sum to $90^\\circ$).', 'Trong tam giác vuông, hai góc nhọn phụ nhau (tổng bằng $90^\\circ$).'),
        v('g7l12-v2', 'hypotenuse / legs', 'n', 'cạnh huyền / hai cạnh góc vuông', 'The side opposite the right angle is the hypotenuse; the two sides forming the right angle are legs.', 'Cạnh đối diện góc vuông là cạnh huyền; hai cạnh kề góc vuông là hai cạnh góc vuông.', 'In right $\\triangle ABC$ at $A$, $BC$ is the hypotenuse.', 'Trong $\\triangle ABC$ vuông tại $A$, $BC$ là cạnh huyền.'),
        v('g7l12-v3', 'exterior angle', 'n phr', 'góc ngoài của tam giác', 'An angle forming a linear pair with an interior angle of the triangle.', 'Góc kề bù với một góc trong của tam giác.', 'An exterior angle equals the sum of the two non-adjacent interior angles.', 'Mỗi góc ngoài của tam giác bằng tổng hai góc trong không kề với nó.'),
      ],
      [
        n('g7l12-n1', '\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ', 'angle A plus angle B plus angle C equals one hundred eighty degrees', 'tổng ba góc A, B, C trong tam giác bằng 180 độ'),
      ],
      [
        e('g7l12-e1', 'describe', 'The two acute angles of a right triangle always sum to $90^\\circ$.', 'Trong một tam giác vuông, hai góc nhọn phụ nhau.'),
        e('g7l12-e2', 'question', 'If $\\angle A = 50^\\circ$ and $\\angle B = 65^\\circ$, what kind of triangle is $\\triangle ABC$?', 'Nếu $\\widehat{A} = 50^\\circ$ và $\\widehat{B} = 65^\\circ$ thì $\\triangle ABC$ là tam giác gì?'),
        e('g7l12-e3', 'present', 'By the angle-sum theorem, $\\angle C = 180^\\circ - (50^\\circ + 65^\\circ) = 65^\\circ$.', 'Áp dụng định lí tổng ba góc, ta có $\\widehat{C} = 180^\\circ - (50^\\circ + 65^\\circ) = 65^\\circ$.'),
      ],
      [
        ex(
          'g7l12-ex1',
          'Finding unknown angles using ratio',
          'Tìm góc của tam giác theo tỉ số',
          'The angles of $\\triangle ABC$ are in ratio $2 : 3 : 4$. Find all three angles.',
          'Số đo ba góc của $\\triangle ABC$ tỉ lệ với $2; 3; 4$. Tính số đo mỗi góc.',
          [
            s('Step 1: Express angles with $k$', 'Bước 1: Đặt theo $k$', 'Let $\\angle A = 2k, \\angle B = 3k, \\angle C = 4k$.', 'Đặt $\\widehat{A} = 2k, \\widehat{B} = 3k, \\widehat{C} = 4k$.'),
            s('Step 2: Apply $180^\\circ$ sum', 'Bước 2: Áp dụng tổng $180^\\circ$', '$2k + 3k + 4k = 180^\\circ \\Rightarrow 9k = 180^\\circ \\Rightarrow k = 20^\\circ$.', '$9k = 180^\\circ \\Rightarrow k = 20^\\circ$.'),
          ],
          'The angles are $40^\\circ, 60^\\circ, 80^\\circ$ (acute triangle).',
          'Ba góc là $40^\\circ, 60^\\circ, 80^\\circ$ (tam giác nhọn).'
        ),
      ],
      ['Từ `hypotenuse` /haɪˈpɒtənjuːz/ cần cho học sinh luyện đọc nhiều lần. Phân biệt `complementary` ($90^\\circ$) và `supplementary` ($180^\\circ$).']
    ),
    lesson(
      7, 4, 13,
      'Congruent Triangles. First Criterion: Side–Side–Side (SSS)',
      'Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác',
      ['Define congruent triangles with matching vertex order ($\\triangle ABC \\cong \\triangle DEF$).', 'Prove two triangles congruent using the Side–Side–Side (SSS / c.c.c) criterion.'],
      ['Viết đúng thứ tự đỉnh tương ứng của hai tam giác bằng nhau.', 'Chứng minh hai tam giác bằng nhau theo trường hợp cạnh – cạnh – cạnh (c.c.c / SSS).'],
      [
        v('g7l13-v1', 'congruent triangles', 'n phr', 'hai tam giác bằng nhau', 'Two triangles whose corresponding sides are equal and corresponding angles are equal.', 'Hai tam giác có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.', 'In $\\triangle ABC \\cong \\triangle DEF$, vertex $A$ corresponds to $D$.', 'Trong $\\triangle ABC = \\triangle DEF$, đỉnh $A$ tương ứng với đỉnh $D$.'),
        v('g7l13-v2', 'corresponding sides / angles', 'n phr', 'cạnh tương ứng / góc tương ứng', 'Sides or angles paired by the vertex alignment of two congruent triangles.', 'Cặp cạnh hoặc góc đặt đúng vị trí tương ứng giữa hai tam giác.', 'Corresponding parts of congruent triangles are equal.', 'Các cạnh tương ứng và góc tương ứng của hai tam giác bằng nhau thì bằng nhau.'),
        v('g7l13-v3', 'Side–Side–Side (SSS)', 'n phr', 'cạnh – cạnh – cạnh (c.c.c)', 'If three sides of one triangle equal three sides of another, the triangles are congruent.', 'Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau.', 'By the SSS criterion, $\\triangle ABC \\cong \\triangle MNP$.', 'Theo trường hợp c.c.c, $\\triangle ABC = \\triangle MNP$.'),
      ],
      [
        n('g7l13-n1', '\\triangle ABC \\cong \\triangle DEF', 'triangle A B C is congruent to triangle D E F', 'tam giác ABC bằng tam giác DEF', 'Vietnamese textbooks write $=$, while English math textbooks strictly use $\\cong$ ("is congruent to").', 'Việt Nam dùng dấu $=$, còn tiếng Anh quốc tế bắt buộc dùng kí hiệu $\\cong$ (congruent) để phân biệt với bằng nhau về diện tích.'),
      ],
      [
        e('g7l13-e1', 'describe', 'Always align corresponding vertices in the exact same order when writing congruence.', 'Luôn viết đúng thứ tự các đỉnh tương ứng khi ghi kí hiệu hai tam giác bằng nhau.'),
        e('g7l13-e2', 'question', 'Which side is the common side of $\\triangle ABD$ and $\\triangle ACD$?', 'Cạnh nào là cạnh chung của $\\triangle ABD$ và $\\triangle ACD$?'),
        e('g7l13-e3', 'present', 'Having $AB = DE$, $BC = EF$, and $AC = DF$, we conclude $\\triangle ABC \\cong \\triangle DEF$ (SSS).', 'Có $AB = DE, BC = EF, AC = DF$, suy ra $\\triangle ABC = \\triangle DEF$ (c.c.c).'),
      ],
      [
        ex(
          'g7l13-ex1',
          'Proving congruence by SSS',
          'Chứng minh hai tam giác bằng nhau (c.c.c)',
          'Given $AB = AC$ and $M$ is the midpoint of $BC$. Prove $\\triangle ABM \\cong \\triangle ACM$ and deduce $AM$ bisects $\\angle BAC$.',
          'Cho $AB = AC$, $M$ là trung điểm $BC$. Chứng minh $\\triangle ABM = \\triangle ACM$ và $AM$ là phân giác $\\widehat{BAC}$.',
          [
            s('Step 1: List three equal side pairs', 'Bước 1: Nêu ba cặp cạnh bằng nhau', '$AB = AC$ (given), $BM = CM$ ($M$ is midpoint), $AM$ is a common side.', '$AB = AC$ (gt), $BM = CM$ (vì $M$ trung điểm), $AM$ chung.'),
            s('Step 2: Conclude congruence and angles', 'Bước 2: Kết luận bằng nhau và suy ra góc', '$\\triangle ABM \\cong \\triangle ACM$ (SSS), so $\\angle BAM = \\angle CAM$ (corresponding angles).', '$\\triangle ABM = \\triangle ACM$ (c.c.c), suy ra $\\widehat{BAM} = \\widehat{CAM}$ (hai góc tương ứng).'),
          ],
          'Hence $AM$ is the angle bisector of $\\angle BAC$.',
          'Suy ra $AM$ là tia phân giác của $\\widehat{BAC}$.'
        ),
      ],
      ['Điểm khác biệt kí hiệu cốt lõi: tiếng Anh viết $\\triangle ABC \\cong \\triangle DEF$ (congruent) chứ KHÔNG dùng $=$.']
    ),
    lesson(
      7, 4, 14,
      'Second and Third Congruence Criteria: SAS and ASA',
      'Trường hợp bằng nhau thứ hai và thứ ba của tam giác',
      ['Apply Side–Angle–Side (SAS / c.g.c) paying attention to the included angle.', 'Apply Angle–Side–Angle (ASA / g.c.g) paying attention to the included side.'],
      ['Chứng minh hai tam giác bằng nhau theo c.g.c (SAS) với góc xen giữa.', 'Chứng minh hai tam giác bằng nhau theo g.c.g (ASA) với cạnh xen giữa.'],
      [
        v('g7l14-v1', 'included angle', 'n phr', 'góc xen giữa', 'The angle formed by two given adjacent sides of a triangle.', 'Góc tạo bởi hai cạnh đang xét của tam giác.', 'In SAS, the equal angle must be the included angle between the two equal sides.', 'Trong trường hợp c.g.c, góc bằng nhau phải là góc xen giữa hai cạnh đó.'),
        v('g7l14-v2', 'included side', 'n phr', 'cạnh xen giữa', 'The side joining the vertices of two given angles.', 'Cạnh nằm kề giữa hai góc đang xét.', 'In ASA, the equal side lies between the two equal angles.', 'Trong trường hợp g.c.g, cạnh bằng nhau phải kề với cả hai góc.'),
      ],
      [
        n('g7l14-n1', '\\text{SAS (c.g.c) and ASA (g.c.g)}', 'Side-Angle-Side and Angle-Side-Angle', 'cạnh góc cạnh và góc cạnh góc'),
      ],
      [
        e('g7l14-e1', 'describe', 'An included angle is essential for SAS; two sides and a non-included angle do not guarantee congruence.', 'Góc bắt buộc phải xen giữa hai cạnh trong c.g.c; nếu không xen giữa thì hai tam giác chưa chắc bằng nhau.'),
        e('g7l14-e2', 'question', 'Where is the angle located relative to the two sides $AB$ and $AC$?', 'Góc đó có nằm xen giữa hai cạnh $AB$ và $AC$ không?'),
        e('g7l14-e3', 'present', 'Since $\\angle A = \\angle D$, $AB = DE$, and $\\angle B = \\angle E$, we have $\\triangle ABC \\cong \\triangle DEF$ (ASA).', 'Vì $\\widehat{A} = \\widehat{D}, AB = DE, \\widehat{B} = \\widehat{E}$ nên $\\triangle ABC = \\triangle DEF$ (g.c.g).'),
      ],
      [
        ex(
          'g7l14-ex1',
          'Using vertical angles with SAS',
          'Dùng góc đối đỉnh cho trường hợp c.g.c',
          'Segments $AB$ and $CD$ bisect each other at $O$. Prove $\\triangle OAC \\cong \\triangle OBD$.',
          'Hai đoạn $AB$ và $CD$ cắt nhau tại trung điểm $O$ của mỗi đường. Chứng minh $\\triangle OAC = \\triangle OBD$.',
          [
            s('Step 1: List equal elements', 'Bước 1: Xét $\\triangle OAC$ và $\\triangle OBD$', '$OA = OB$, $\\angle AOC = \\angle BOD$ (vertical angles), and $OC = OD$.', '$OA = OB$, $\\widehat{AOC} = \\widehat{BOD}$ (đối đỉnh), $OC = OD$.'),
            s('Step 2: Apply SAS', 'Bước 2: Áp dụng c.g.c', 'Thus $\\triangle OAC \\cong \\triangle OBD$ by SAS.', 'Vậy $\\triangle OAC = \\triangle OBD$ (c.g.c).'),
          ],
          'Therefore, $\\triangle OAC \\cong \\triangle OBD$ and $AC = BD$.',
          'Suy ra $\\triangle OAC = \\triangle OBD$ và $AC = BD$.'
        ),
      ],
      ['Ghi nhớ cặp từ "included angle" (góc xen giữa) và "included side" (cạnh xen giữa).']
    ),
    lesson(
      7, 4, 15,
      'Congruence Criteria for Right Triangles',
      'Các trường hợp bằng nhau của tam giác vuông',
      ['Apply the four right-triangle congruence cases: Leg–Leg, Leg–Acute Angle, Hypotenuse–Acute Angle, and Hypotenuse–Leg (HL).', 'Identify the special Hypotenuse–Leg criterion as unique to right triangles.'],
      ['Vận dụng $4$ trường hợp bằng nhau của tam giác vuông (đặc biệt cạnh huyền – góc nhọn, cạnh huyền – cạnh góc vuông).', 'Nhận biết điều kiện góc vuông $\\widehat{A} = \\widehat{D} = 90^\\circ$ trước khi kết luận.'],
      [
        v('g7l15-v1', 'Hypotenuse–Leg (HL)', 'n phr', 'cạnh huyền – cạnh góc vuông', 'Two right triangles with equal hypotenuses and one pair of equal legs are congruent.', 'Hai tam giác vuông có cạnh huyền và một cạnh góc vuông bằng nhau thì bằng nhau.', 'Right triangles $\\triangle ABC$ and $\\triangle DEF$ are congruent by HL.', 'Hai tam giác vuông bằng nhau theo trường hợp cạnh huyền – cạnh góc vuông.'),
        v('g7l15-v2', 'Hypotenuse–Acute Angle (HA)', 'n phr', 'cạnh huyền – góc nhọn', 'Two right triangles with equal hypotenuses and one pair of equal acute angles are congruent.', 'Hai tam giác vuông có cạnh huyền và một góc nhọn bằng nhau thì bằng nhau.', 'Use HA when hypotenuse and an acute angle match.', 'Áp dụng trường hợp cạnh huyền – góc nhọn.'),
      ],
      [
        n('g7l15-n1', '\\triangle ABC \\cong \\triangle DEF \\;(\\text{HL})', 'right triangles A B C and D E F are congruent by Hypotenuse-Leg', 'hai tam giác vuông bằng nhau theo trường hợp cạnh huyền – cạnh góc vuông'),
      ],
      [
        e('g7l15-e1', 'describe', 'Always state $\\angle A = \\angle D = 90^\\circ$ explicitly before applying HL or HA.', 'Luôn ghi rõ $\\widehat{A} = \\widehat{D} = 90^\\circ$ khi xét hai tam giác vuông.'),
        e('g7l15-e2', 'question', 'Which side is the hypotenuse in right $\\triangle AHB$?', 'Trong tam giác vuông $AHB$ vuông tại $H$, cạnh nào là cạnh huyền?'),
        e('g7l15-e3', 'present', 'Since $\\angle H = \\angle K = 90^\\circ$, $AB = AC$, and $AH$ is common, $\\triangle AHB \\cong \\triangle AKC$ (HL).', 'Vì $\\widehat{H} = \\widehat{K} = 90^\\circ$, $AB = AC$ và $AH$ chung nên hai tam giác vuông bằng nhau theo cạnh huyền – cạnh góc vuông.'),
      ],
      [
        ex(
          'g7l15-ex1',
          'Using Hypotenuse–Leg on an altitude',
          'Dùng cạnh huyền – góc nhọn với đường cao',
          'In $\\triangle ABC$ with $AB = AC$ and $M$ midpoint of $BC$, drop perpendiculars $MH \\perp AB$, $MK \\perp AC$. Prove $MH = MK$.',
          'Cho $\\triangle ABC$ có $AB = AC$, $M$ trung điểm $BC$. Kẻ $MH \\perp AB$, $MK \\perp AC$. Chứng minh $MH = MK$.',
          [
            s('Step 1: Compare angles $\\angle B$ and $\\angle C$', 'Bước 1: Chỉ ra $\\widehat{B} = \\widehat{C}$', 'From $AB = AC$ and $M$ midpoint of $BC$, $\\triangle ABM \\cong \\triangle ACM \\Rightarrow \\angle B = \\angle C$.', 'Từ $\\triangle ABM = \\triangle ACM \\Rightarrow \\widehat{B} = \\widehat{C}$.'),
            s('Step 2: Apply HA on right triangles', 'Bước 2: Xét hai tam giác vuông $MHB$ và $MKC$', '$\angle MHB = \angle MKC = 90^\\circ$, hypotenuse $MB = MC$, acute $\\angle B = \\angle C$, so $\\triangle MHB \\cong \\triangle MKC$ (HA).', '$\\widehat{MHB} = \\widehat{MKC} = 90^\\circ$, cạnh huyền $MB = MC$, góc nhọn $\\widehat{B} = \\widehat{C}$ $\\Rightarrow$ bằng nhau theo cạnh huyền – góc nhọn.'),
          ],
          'Therefore, $MH = MK$.',
          'Suy ra $MH = MK$.'
        ),
      ],
      ['Trong HL (`Hypotenuse-Leg`), chỉ có tam giác vuông mới suy ra bằng nhau từ cạnh – cạnh – góc không xen giữa!']
    ),
    lesson(
      7, 4, 16,
      'Isosceles Triangles and Perpendicular Bisectors of a Segment',
      'Tam giác cân. Đường trung trực của đoạn thẳng',
      ['Define an isosceles triangle (vertex angle, legs, base, base angles) and its properties.', 'Define and characterize the perpendicular bisector of a segment as equidistant points.'],
      ['Phát biểu định nghĩa và tính chất tam giác cân (cạnh bên, đáy, góc ở đáy).', 'Nêu định nghĩa và tính chất điểm cách đều hai mút của đường trung trực.'],
      [
        v('g7l16-v1', 'isosceles triangle / vertex angle / base angles', 'n phr', 'tam giác cân / góc ở đỉnh / góc ở đáy', 'A triangle with two equal sides; its two base angles opposite those sides are equal.', 'Tam giác có hai cạnh bên bằng nhau; hai góc ở đáy bằng nhau.', 'In an isosceles triangle, the two base angles are equal.', 'Trong tam giác cân, hai góc ở đáy bằng nhau.'),
        v('g7l16-v2', 'perpendicular bisector', 'n phr', 'đường trung trực của đoạn thẳng', 'The line perpendicular to a segment at its midpoint.', 'Đường thẳng vuông góc với một đoạn thẳng tại trung điểm của nó.', 'Any point on the perpendicular bisector of $AB$ is equidistant from $A$ and $B$.', 'Mọi điểm nằm trên đường trung trực của $AB$ đều cách đều $A$ và $B$.'),
      ],
      [
        n('g7l16-n1', 'MA = MB \\Leftrightarrow M \\text{ lies on the perpendicular bisector of } AB', 'M is equidistant from A and B if and only if M lies on the perpendicular bisector of segment AB', 'M cách đều A và B khi và chỉ khi M nằm trên đường trung trực của AB'),
      ],
      [
        e('g7l16-e1', 'describe', 'An isosceles triangle with a $60^\\circ$ angle is necessarily an equilateral triangle.', 'Tam giác cân có một góc bằng $60^\\circ$ là tam giác đều.'),
        e('g7l16-e2', 'question', 'If the vertex angle of an isosceles triangle is $40^\\circ$, what is each base angle?', 'Nếu góc ở đỉnh của tam giác cân bằng $40^\\circ$ thì mỗi góc ở đáy bằng bao nhiêu?'),
        e('g7l16-e3', 'present', 'Since $PA = PB$, point $P$ lies on the perpendicular bisector of $AB$.', 'Vì $PA = PB$ nên $P$ thuộc đường trung trực của đoạn thẳng $AB$.'),
      ],
      [
        ex(
          'g7l16-ex1',
          'Angles of an isosceles triangle',
          'Tính góc trong tam giác cân',
          'Triangle $ABC$ is isosceles at $A$ with base angle $\\angle B = 55^\\circ$. Find $\\angle C$ and $\\angle A$.',
          'Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 55^\\circ$. Tính $\\widehat{C}$ và $\\widehat{A}$.',
          [
            s('Step 1: Find the other base angle', 'Bước 1: Tìm góc ở đáy còn lại', 'Because $\\triangle ABC$ is isosceles at $A$, $\\angle C = \\angle B = 55^\\circ$.', 'Vì $\\triangle ABC$ cân tại $A$ nên $\\widehat{C} = \\widehat{B} = 55^\\circ$.'),
            s('Step 2: Find vertex angle $A$', 'Bước 2: Tính góc ở đỉnh $A$', '$\\angle A = 180^\\circ - 2 \\times 55^\\circ = 70^\\circ$.', '$\\widehat{A} = 180^\\circ - 2 \\times 55^\\circ = 70^\\circ$.'),
          ],
          'Thus $\\angle C = 55^\\circ$ and $\\angle A = 70^\\circ$.',
          'Vậy $\\widehat{C} = 55^\\circ$ và $\\widehat{A} = 70^\\circ$.'
        ),
      ],
      ['Phát âm `isosceles` /aɪˈsɒsɪliːz/. Phân biệt `angle bisector` (tia phân giác) và `perpendicular bisector` (đường trung trực).']
    ),
  ]),
  chapter(7, 5, 'Collecting and Representing Data', 'Thu thập và biểu diễn dữ liệu', [
    lesson(
      7, 5, 17,
      'Collecting and Classifying Data',
      'Thu thập và phân loại dữ liệu',
      ['Classify numerical data vs. non-numerical data (ordered vs. unordered).', 'Evaluate whether a sample is representative of the target population.'],
      ['Phân loại dữ liệu định lượng và định tính (có thể/không thể sắp thứ tự).', 'Đánh giá tính đại diện của mẫu khảo sát.'],
      [
        v('g7l17-v1', 'sample / population / representative', 'n / adj', 'mẫu / tổng thể / có tính đại diện', 'A subset selected from a population that fairly reflects the whole group.', 'Một phần đối tượng được chọn ra phản ánh trung thực cho toàn bộ tập hợp.', 'Surveying only the basketball club about favorite sports is not representative of the whole school.', 'Chỉ hỏi câu lạc bộ bóng rổ về môn thể thao yêu thích sẽ không đại diện cho toàn trường.'),
        v('g7l17-v2', 'valid / reliable data', 'adj phr', 'dữ liệu hợp lí / đáng tin cậy', 'Data consistent with the survey rules and free of impossible outliers.', 'Dữ liệu đúng tiêu chí thu thập và phù hợp thực tế.', 'Check data validity before plotting charts.', 'Kiểm tra tính hợp lí của dữ liệu trước khi vẽ biểu đồ.'),
      ],
      [
        n('g7l17-n1', '\\text{Sample} \\subset \\text{Population}', 'a representative sample of the population', 'mẫu đại diện của tập thể nghiên cứu'),
      ],
      [
        e('g7l17-e1', 'describe', 'For reliable conclusions, the surveyed sample must represent the whole target group.', 'Để kết luận đáng tin cậy, mẫu dữ liệu thu thập phải đảm bảo tính đại diện.'),
        e('g7l17-e2', 'question', 'Is a rating scale (Poor, Fair, Good, Excellent) numerical or ordered categorical data?', 'Thang đánh giá (Chưa đạt, Đạt, Khá, Tốt) là số liệu hay dữ liệu phân loại có thứ tự?'),
        e('g7l17-e3', 'present', 'The percentages sum to $100\\%$, so the survey data is consistent.', 'Tổng các tỉ lệ phần trăm đúng bằng $100\\%$ nên dữ liệu hợp lệ.'),
      ],
      [
        ex(
          'g7l17-ex1',
          'Checking representativeness of a survey',
          'Đánh giá tính đại diện của mẫu khảo sát',
          'To estimate how many students in a middle school read library books daily, Lan asks $30$ students currently sitting in the school library. Is this sample representative?',
          'Để tìm hiểu tỉ lệ học sinh toàn trường thích đọc sách hằng ngày, Lan hỏi $30$ bạn đang ngồi trong thư viện. Mẫu này có đại diện không?',
          [
            s('Step 1: Analyze bias', 'Bước 1: Phân tích thiên lệch', 'Students inside the library already tend to read more often than average students.', 'Những bạn đang ở trong thư viện vốn đã có xu hướng thích đọc sách hơn mức trung bình.'),
            s('Step 2: Suggest improvement', 'Bước 2: Đề xuất cách chọn mẫu tốt hơn', 'Randomly select students across all classes in Grades 6–9 instead.', 'Nên chọn ngẫu nhiên học sinh từ tất cả các lớp khối 6–9.'),
          ],
          'No, the sample is biased and not representative.',
          'Không, mẫu bị thiên lệch nên không đảm bảo tính đại diện.'
        ),
      ],
      ['Giúp học sinh đặt câu hỏi kiểm chứng: "Is the percentage sum $100\\%$?" và "Who was surveyed?".']
    ),
    lesson(
      7, 5, 18,
      'Pie Charts',
      'Biểu đồ hình quạt tròn',
      ['Read percentage sectors and central angles ($360^\\circ$) on a pie chart.', 'Convert between sector percentages, actual counts, and central angles.'],
      ['Đọc các hình quạt phần trăm và góc ở tâm trên biểu đồ hình quạt tròn.', 'Chuyển đổi giữa phần trăm, số lượng thực tế và số đo góc ở tâm ($360^\\circ$).'],
      [
        v('g7l18-v1', 'pie chart / circle graph', 'n phr', 'biểu đồ hình quạt tròn', 'A circular chart divided into sectors showing proportions of a whole ($100\\%$).', 'Biểu đồ hình tròn chia thành các hình quạt biểu thị tỉ lệ phần trăm của tổng thể.', 'Each sector in a pie chart shows its share out of $100\\%$.', 'Mỗi hình quạt biểu thị tỉ lệ phần trăm trong tổng số $100\\%$.'),
        v('g7l18-v2', 'sector / central angle', 'n phr', 'hình quạt / góc ở tâm', 'A slice of the circle whose central angle equals $\\text{percent} \\times 360^\\circ$.', 'Một phần hình tròn có góc ở tâm tương ứng với tỉ lệ phần trăm của $360^\\circ$.', '$25\\%$ corresponds to a central angle of $90^\\circ$.', '$25\\%$ ứng với góc ở tâm $90^\\circ$.'),
      ],
      [
        n('g7l18-n1', '\\text{Part} = \\text{Total} \\cdot p\\%, \\quad \\theta = 360^\\circ \\cdot p\\%', 'quantity equals total times p percent, and central angle equals three hundred sixty degrees times p percent', 'giá trị thành phần bằng tổng nhân tỉ lệ phần trăm'),
      ],
      [
        e('g7l18-e1', 'describe', 'The percentages of all sectors in a complete pie chart must add up to $100\\%$.', 'Tổng các tỉ số phần trăm của tất cả các hình quạt luôn bằng $100\\%$.'),
        e('g7l18-e2', 'question', 'If $40$ students correspond to $20\\%$ of the pie chart, what is the total number of students?', 'Nếu $40$ học sinh chiếm $20\\%$ trên biểu đồ thì tổng số học sinh là bao nhiêu?'),
        e('g7l18-e3', 'present', 'Computing $40 : 20\\%$ gives a total of $200$ students.', 'Lấy $40 : 20\\%$ ta tính được tổng cộng $200$ học sinh.'),
      ],
      [
        ex(
          'g7l18-ex1',
          'Interpreting a pie chart',
          'Đọc số liệu từ biểu đồ hình quạt tròn',
          'Out of $300$ students surveyed on transport: Bicycle $45\\%$, Bus $30\\%$, Walking $25\\%$. Find the number of bus riders and central angle for Walking.',
          'Khảo sát $300$ học sinh về phương tiện đi học: Xe đạp $45\\%$, Xe buýt $30\\%$, Đi bộ $25\\%$. Tính số bạn đi xe buýt và góc ở tâm của mục Đi bộ.',
          [
            s('Step 1: Bus riders', 'Bước 1: Số học sinh đi xe buýt', '$300 \\times 30\\% = 90$ students.', '$300 \\times 30\\% = 90$ học sinh.'),
            s('Step 2: Central angle for Walking', 'Bước 2: Góc ở tâm mục Đi bộ', '$360^\\circ \\times 25\\% = 90^\\circ$.', '$360^\\circ \\times 25\\% = 90^\\circ$.'),
          ],
          '$90$ students ride the bus; the Walking sector angle is $90^\\circ$.',
          'Có $90$ học sinh đi xe buýt; góc ở tâm mục Đi bộ là $90^\\circ$.'
        ),
      ],
      ['Luôn kiểm tra tổng tất cả phần trăm trên biểu đồ hình quạt bằng $100\\%$.']
    ),
    lesson(
      7, 5, 19,
      'Line Graphs',
      'Biểu đồ đoạn thẳng',
      ['Read time-series trends, peaks, troughs, and rate changes from a line graph.', 'Compare two consecutive time intervals for increase or decrease.'],
      ['Đọc xu hướng tăng giảm, giá trị lớn nhất/nhỏ nhất theo thời gian trên biểu đồ đoạn thẳng.', 'Tính mức độ tăng giảm giữa các mốc thời gian.'],
      [
        v('g7l19-v1', 'line graph', 'n phr', 'biểu đồ đoạn thẳng', 'A graph connecting data points with line segments to display changes over time.', 'Biểu đồ nối các điểm số liệu bằng đoạn thẳng để thể hiện xu thế thay đổi theo thời gian.', 'A line graph clearly shows temperature changes across $12$ months.', 'Biểu đồ đoạn thẳng cho thấy rõ sự thay đổi nhiệt độ qua $12$ tháng.'),
        v('g7l19-v2', 'increase / decrease / trend', 'v / n', 'tăng / giảm / xu hướng', 'Upward slope means increasing; downward slope means decreasing; flat means constant.', 'Đoạn dốc lên là tăng, dốc xuống là giảm, nằm ngang là không đổi.', 'Sales rose sharply between Quarter 2 and Quarter 3.', 'Doanh số tăng mạnh từ quý 2 sang quý 3.'),
      ],
      [
        n('g7l19-n1', '\\text{Percentage increase} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\cdot 100\\%', 'percentage increase equals new minus old divided by old times one hundred percent', 'tỉ lệ tăng phần trăm bằng giá trị mới trừ cũ chia cũ nhân 100 phần trăm'),
      ],
      [
        e('g7l19-e1', 'describe', 'The steeper the upward segment, the faster the quantity increases over that period.', 'Đoạn thẳng đi lên càng dốc thì đại lượng tăng càng nhanh trong khoảng thời gian đó.'),
        e('g7l19-e2', 'question', 'During which time interval did the value decline the most?', 'Trong khoảng thời gian nào thì giá trị giảm nhiều nhất?'),
        e('g7l19-e3', 'present', 'From $2022$ to $2023$, production rose from $80$ to $100$ tons, an increase of $25\\%$.', 'Từ năm $2022$ đến $2023$, sản lượng tăng từ $80$ lên $100$ tấn, tức tăng $25\\%$.'),
      ],
      [
        ex(
          'g7l19-ex1',
          'Reading trend and percentage change',
          'Đọc xu thế và tính phần trăm tăng trưởng',
          'A store\'s monthly revenue (million VND) over Jan–Apr is $40, 50, 45, 60$. Find the steepest rise and percentage increase from Jan to Feb.',
          'Doanh thu 4 tháng (triệu đồng): T1 là $40$, T2 là $50$, T3 là $45$, T4 là $60$. Tìm giai đoạn tăng mạnh nhất và tỉ lệ tăng từ T1 sang T2.',
          [
            s('Step 1: Compare monthly changes', 'Bước 1: So sánh độ tăng từng tháng', 'Jan$\\to$Feb: $+10$; Feb$\\to$Mar: $-5$; Mar$\\to$Apr: $+15$ (steepest rise).', 'T1$\\to$T2: $+10$; T2$\\to$T3: $-5$; T3$\\to$T4: $+15$ (tăng mạnh nhất).'),
            s('Step 2: Percentage increase Jan to Feb', 'Bước 2: Phần trăm tăng T1 sang T2', '$\\frac{50 - 40}{40} \\cdot 100\\% = 25\\%$.', '$\\frac{50 - 40}{40} \\cdot 100\\% = 25\\%$.'),
          ],
          'Steepest rise is Mar to Apr ($+15$ million); Jan–Feb increase is $25\\%$.',
          'Tăng mạnh nhất từ T3 sang T4 ($+15$ triệu); T1–T2 tăng $25\\%$.'
        ),
      ],
      ['Khi dạy song ngữ, nhắc động từ miêu tả xu hướng hay dùng: `increase / rise / go up`, `decrease / drop / decline`, `remain unchanged`.']
    ),
  ]),
];
