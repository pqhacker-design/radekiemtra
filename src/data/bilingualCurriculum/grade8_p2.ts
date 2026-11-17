import { chapter, e, ex, lesson, n, s, v } from './helpers';
import { CurriculumChapter } from './types';

export const GRADE_8_CHAPTERS_6_TO_10: CurriculumChapter[] = [
  chapter(8, 6, 'Algebraic Fractions', 'Phân thức đại số', [
    lesson(
      8, 6, 21,
      'Algebraic Fractions',
      'Phân thức đại số',
      ['Define an algebraic fraction $\\frac{A}{B}$ with polynomials $A, B$ ($B \\ne 0$) and state its domain condition.', 'Test equality $\\frac{A}{B} = \\frac{C}{D}$ via $AD = BC$.'],
      ['Nêu khái niệm phân thức đại số và tìm điều kiện xác định ($B \\ne 0$).', 'Kiểm tra hai phân thức bằng nhau bằng tích chéo $A \\cdot D = B \\cdot C$.'],
      [
        v('g8l21-v1', 'algebraic fraction / rational expression', 'n phr', 'phân thức đại số', 'An expression of the form $\\frac{A}{B}$ where $A, B$ are polynomials and $B \\ne 0$.', 'Biểu thức dạng $\\frac{A}{B}$ với $A, B$ là hai đa thức và $B$ khác đa thức không.', 'Every polynomial $P$ is an algebraic fraction $\\frac{P}{1}$.', 'Mỗi đa thức cũng được coi là một phân thức với mẫu thức bằng $1$.'),
        v('g8l21-v2', 'domain / condition of definition', 'n phr', 'điều kiện xác định (ĐKXĐ)', 'Values of variables for which the denominator is nonzero ($B \\ne 0$).', 'Điều kiện của biến làm cho mẫu thức khác $0$.', 'The condition for $\\frac{x + 1}{x - 3}$ is $x \\ne 3$.', 'Điều kiện xác định của $\\frac{x + 1}{x - 3}$ là $x \\ne 3$.'),
      ],
      [
        n('g8l21-n1', '\\frac{A}{B} \\text{ defined } \\Leftrightarrow B \\ne 0', 'the algebraic fraction A over B is defined if and only if B is nonzero', 'phân thức A phần B xác định khi B khác 0'),
      ],
      [
        e('g8l21-e1', 'describe', 'Always state the domain condition $B \\ne 0$ before substituting numbers into an algebraic fraction.', 'Luôn tìm điều kiện xác định để mẫu khác $0$ trước khi tính giá trị phân thức.'),
        e('g8l21-e2', 'question', 'For what values of $x$ is the algebraic fraction $\\frac{x + 2}{x^2 - 4}$ defined?', 'Với những giá trị nào của $x$ thì phân thức $\\frac{x + 2}{x^2 - 4}$ xác định?'),
        e('g8l21-e3', 'present', 'Setting $x^2 - 4 \\ne 0$ gives $x \\ne 2$ and $x \\ne -2$.', 'Giải $x^2 - 4 \\ne 0$ ta được $x \\ne \\pm 2$.'),
      ],
      [
        ex(
          'g8l21-ex1',
          'Domain condition and cross-product check',
          'Tìm ĐKXĐ và kiểm tra phân thức bằng nhau',
          'Find the domain condition of $\\frac{x - 1}{x^2 - 1}$ and check if it equals $\\frac{1}{x + 1}$.',
          'Tìm ĐKXĐ của $\\frac{x - 1}{x^2 - 1}$ và kiểm tra xem có bằng $\\frac{1}{x + 1}$ không.',
          [
            s('Step 1: Find domain', 'Bước 1: Tìm điều kiện xác định', '$x^2 - 1 \\ne 0 \\Rightarrow (x - 1)(x + 1) \\ne 0 \\Rightarrow x \\ne \\pm 1$.', '$x^2 - 1 \\ne 0 \\Rightarrow x \\ne 1$ và $x \\ne -1$.'),
            s('Step 2: Cross-multiply', 'Bước 2: Kiểm tra tích chéo', '$(x - 1)(x + 1) = x^2 - 1 = 1 \\cdot (x^2 - 1)$, so they are equal for $x \\ne \\pm 1$.', '$(x - 1)(x + 1) = x^2 - 1$, nên hai phân thức bằng nhau với $x \\ne \\pm 1$.'),
          ],
          'Defined for $x \\ne \\pm 1$; equal on the shared domain.',
          'Xác định khi $x \\ne \\pm 1$ và hai phân thức bằng nhau.'
        ),
      ],
      ['Lưu ý chỉ được kết luận hai phân thức bằng nhau khi kiểm tra $AD = BC$, sau đó dùng trong bước rút gọn ở bài 22.']
    ),
    lesson(
      8, 6, 22,
      'Fundamental Property of Algebraic Fractions',
      'Tính chất cơ bản của phân thức đại số',
      ['Apply the fundamental property and sign-flipping rule $\\frac{A}{B} = \\frac{-A}{-B}$.', 'Simplify algebraic fractions by factoring and find the least common denominator (LCD).'],
      ['Vận dụng tính chất cơ bản và quy tắc đổi dấu phân thức.', 'Rút gọn phân thức và quy đồng mẫu thức nhiều phân thức.'],
      [
        v('g8l22-v1', 'simplify / reduce an algebraic fraction', 'v phr', 'rút gọn phân thức', 'Factoring both numerator and denominator and canceling nonzero common factors.', 'Phân tích tử và mẫu thành nhân tử rồi chia cả hai cho nhân tử chung.', 'Never cancel single terms across a plus or minus sign—only cancel common factors!', 'Không bao giờ rút gọn từng số hạng qua dấu cộng/trừ—chỉ rút gọn thừa số chung!'),
        v('g8l22-v2', 'least common denominator (LCD)', 'n phr', 'mẫu thức chung nhỏ nhất', 'The product of common and distinct prime polynomial factors taken at their highest powers.', 'Tích các nhân tử bằng số và bằng chữ với số mũ cao nhất.', 'Factor each denominator first to build the LCD cleanly.', 'Phân tích từng mẫu thành nhân tử trước khi lập mẫu thức chung.'),
      ],
      [
        n('g8l22-n1', '\\frac{A}{B} = \\frac{-A}{-B}, \\quad \\frac{A}{-B} = -\\frac{A}{B}', 'changing the signs of both numerator and denominator keeps the fraction unchanged', 'đổi dấu cả tử và mẫu thì được phân thức mới bằng phân thức đã cho'),
      ],
      [
        e('g8l22-e1', 'describe', 'Flipping the signs of both numerator and denominator leaves the algebraic fraction unchanged.', 'Đổi dấu đồng thời cả tử thức và mẫu thức thì giá trị phân thức không đổi.'),
        e('g8l22-e2', 'question', 'How do we align denominators $x - 2$ and $2 - x$ when finding a common denominator?', 'Làm sao đồng bộ hai mẫu đối nhau $x - 2$ và $2 - x$ khi quy đồng?'),
        e('g8l22-e3', 'present', 'Rewrite $\\frac{5}{2 - x} = \\frac{-5}{x - 2}$ so both fractions share denominator $x - 2$.', 'Đổi dấu thành $\\frac{-5}{x - 2}$ để chung mẫu $x - 2$.'),
      ],
      [
        ex(
          'g8l22-ex1',
          'Simplifying and finding LCD',
          'Rút gọn và tìm mẫu thức chung',
          'Simplify $\\frac{x^2 - 9}{x^2 + 3x}$ ($x \\ne 0, -3$) and find the LCD of $\\frac{1}{x^2 - 1}$ and $\\frac{2}{x + 1}$.',
          'Rút gọn $\\frac{x^2 - 9}{x^2 + 3x}$ và tìm mẫu thức chung của $\\frac{1}{x^2 - 1}$ và $\\frac{2}{x + 1}$.',
          [
            s('Step 1: Factor and cancel', 'Bước 1: Phân tích và rút gọn', '$\\frac{(x - 3)(x + 3)}{x(x + 3)} = \\frac{x - 3}{x}$.', '$\\frac{(x - 3)(x + 3)}{x(x + 3)} = \\frac{x - 3}{x}$.'),
            s('Step 2: Build LCD', 'Bước 2: Tìm mẫu thức chung', 'Since $x^2 - 1 = (x - 1)(x + 1)$, the LCD is $(x - 1)(x + 1)$.', 'Vì $x^2 - 1 = (x - 1)(x + 1)$ nên mẫu thức chung là $(x - 1)(x + 1)$.'),
          ],
          'Simplified form: $\\frac{x - 3}{x}$; LCD: $(x - 1)(x + 1)$.',
          'Kết quả rút gọn: $\\frac{x - 3}{x}$; mẫu thức chung: $(x - 1)(x + 1)$.'
        ),
      ],
      ['Nhấn mạnh lỗi học sinh hay mắc: $\\frac{x + 2}{x}$ KHÔNG thể gạch $x$ đi để ra $2$!']
    ),
    lesson(
      8, 6, 23,
      'Addition and Subtraction of Algebraic Fractions',
      'Phép cộng và phép trừ phân thức đại số',
      ['Add and subtract algebraic fractions with same and different denominators.', 'Simplify the numerator carefully after subtracting and reduce the final result.'],
      ['Cộng trừ các phân thức cùng mẫu và khác mẫu.', 'Rút gọn tử thức sau phép trừ và đưa kết quả về phân thức tối giản.'],
      [
        v('g8l23-v1', 'opposite fraction', 'n phr', 'phân thức đối', 'For $\\frac{A}{B}$, its opposite is $-\\frac{A}{B} = \\frac{-A}{B}$.', 'Phân thức có tổng với phân thức đã cho bằng $0$.', 'To subtract $\\frac{C}{D}$, add its opposite $\\frac{-C}{D}$.', 'Muốn trừ phân thức, ta cộng với phân thức đối của nó.'),
      ],
      [
        n('g8l23-n1', '\\frac{A}{M} - \\frac{B}{M} = \\frac{A - B}{M}', 'to subtract fractions with the same denominator, subtract the numerators over the common denominator', 'trừ hai phân thức cùng mẫu: lấy tử trừ tử và giữ nguyên mẫu chung'),
      ],
      [
        e('g8l23-e1', 'describe', 'Always wrap each numerator polynomial in parentheses before subtracting over the common denominator.', 'Luôn đặt tử thức của phân thức bị trừ trong dấu ngoặc trước khi đổi dấu trừ.'),
        e('g8l23-e2', 'question', 'After finding the common denominator $(x - 2)(x + 2)$, what extra factor multiplies the numerator of $\\frac{3}{x - 2}$?', 'Với mẫu chung $(x - 2)(x + 2)$, nhân tử phụ của $\\frac{3}{x - 2}$ là gì?'),
        e('g8l23-e3', 'present', 'Simplifying the numerator factors out $(x - 1)$ and cancels with the denominator.', 'Rút gọn tử thức rồi phân tích tiếp để khử nhân tử chung với mẫu.'),
      ],
      [
        ex(
          'g8l23-ex1',
          'Adding and subtracting algebraic fractions',
          'Cộng trừ phân thức khác mẫu',
          'Simplify $\\frac{x}{x - 2} - \\frac{2}{x + 2} - \\frac{4x}{x^2 - 4}$ ($x \\ne \\pm 2$).',
          'Rút gọn $\\frac{x}{x - 2} - \\frac{2}{x + 2} - \\frac{4x}{x^2 - 4}$.',
          [
            s('Step 1: Factor LCD and convert', 'Bước 1: Quy đồng mẫu chung $(x - 2)(x + 2)$', '$\\frac{x(x + 2) - 2(x - 2) - 4x}{(x - 2)(x + 2)}$.', '$\\frac{x(x + 2) - 2(x - 2) - 4x}{(x - 2)(x + 2)}$.'),
            s('Step 2: Expand and simplify numerator', 'Bước 2: Thu gọn tử thức và rút gọn', 'Numerator $= x^2 + 2x - 2x + 4 - 4x = x^2 - 4x + 4 = (x - 2)^2$. Canceling $(x - 2)$ yields $\\frac{x - 2}{x + 2}$.', 'Tử $= (x - 2)^2$, rút gọn được $\\frac{x - 2}{x + 2}$.'),
          ],
          'The simplified expression is $\\frac{x - 2}{x + 2}$.',
          'Kết quả rút gọn là $\\frac{x - 2}{x + 2}$.'
        ),
      ],
      ['Luôn giữ nguyên mẫu thức ở dạng tích $(x - 2)(x + 2)$ ở cuối bước tử thức để xem có rút gọn được tiếp không.']
    ),
    lesson(
      8, 6, 24,
      'Multiplication and Division of Algebraic Fractions',
      'Phép nhân và phép chia phân thức đại số',
      ['Multiply algebraic fractions by factoring and cross-canceling common polynomial factors.', 'Divide algebraic fractions by multiplying by the reciprocal and respecting parentheses in combined expressions.'],
      ['Nhân hai phân thức, phân tích nhân tử để rút gọn chéo.', 'Chia phân thức bằng cách nhân phân thức nghịch đảo và thực hiện đúng thứ tự phép tính.'],
      [
        v('g8l24-v1', 'reciprocal algebraic fraction', 'n phr', 'phân thức nghịch đảo', 'For $\\frac{A}{B} \\ne 0$, its reciprocal is $\\frac{B}{A}$.', 'Nghịch đảo của phân thức $\\frac{A}{B} \\ne 0$ là $\\frac{B}{A}$.', 'Rewrite division as multiplication by the reciprocal.', 'Đổi phép chia thành phép nhân với phân thức nghịch đảo.'),
      ],
      [
        n('g8l24-n1', '\\frac{A}{B} : \\frac{C}{D} = \\frac{A}{B} \\cdot \\frac{D}{C} \\;(C \\ne 0)', 'divide by multiplying by the reciprocal of the divisor', 'chia cho C phần D bằng nhân với D phần C'),
      ],
      [
        e('g8l24-e1', 'describe', 'Factor all numerators and denominators before multiplying so common factors cancel immediately.', 'Phân tích toàn bộ tử và mẫu thành nhân tử trước khi nhân để rút gọn ngay lập tức.'),
        e('g8l24-e2', 'question', 'In $A : B \\cdot C$, do we perform division or multiplication first?', 'Trong biểu thức $A : B \\cdot C$, ta thực hiện phép chia hay phép nhân trước?'),
        e('g8l24-e3', 'present', 'Division and multiplication share equal precedence, so always compute strictly from left to right.', 'Phép chia và phép nhân cùng bậc ưu tiên nên tính lần lượt từ trái sang phải.'),
      ],
      [
        ex(
          'g8l24-ex1',
          'Dividing algebraic fractions',
          'Chia phân thức đại số',
          'Compute $\\frac{x^2 - 1}{x + 3} : \\frac{x + 1}{x^2 + 3x}$ ($x \\ne 0, -1, -3$).',
          'Tính $\\frac{x^2 - 1}{x + 3} : \\frac{x + 1}{x^2 + 3x}$.',
          [
            s('Step 1: Multiply by reciprocal and factor', 'Bước 1: Nhân nghịch đảo và phân tích nhân tử', '$\\frac{(x - 1)(x + 1)}{x + 3} \\cdot \\frac{x(x + 3)}{x + 1}$.', '$\\frac{(x - 1)(x + 1)}{x + 3} \\cdot \\frac{x(x + 3)}{x + 1}$.'),
            s('Step 2: Cancel common factors', 'Bước 2: Rút gọn nhân tử chung', 'Cancel $(x + 1)$ and $(x + 3)$ to obtain $x(x - 1)$.', 'Rút gọn $(x + 1)$ và $(x + 3)$ còn $x(x - 1)$.'),
          ],
          'The result is $x(x - 1) = x^2 - x$.',
          'Kết quả là $x(x - 1) = x^2 - x$.'
        ),
      ],
      ['Lưu ý thứ tự từ trái sang phải khi gặp chuỗi phép nhân chia liên tiếp không có dấu ngoặc.']
    ),
  ]),
  chapter(8, 7, 'Linear Equations and Linear Functions', 'Phương trình bậc nhất và hàm số bậc nhất', [
    lesson(
      8, 7, 25,
      'Linear Equations in One Variable',
      'Phương trình bậc nhất một ẩn',
      ['Identify a linear equation $ax + b = 0$ ($a \\ne 0$) and apply equivalence rules (transposing, multiplying/dividing by nonzero numbers).', 'Reduce parenthesized or fractional linear equations to $ax + b = 0$ to solve.'],
      ['Nhận biết phương trình bậc nhất một ẩn $ax + b = 0$ ($a \\ne 0$) và hai quy tắc biến đổi.', 'Đưa phương trình về dạng $ax + b = 0$ để giải.'],
      [
        v('g8l25-v1', 'linear equation in one variable', 'n phr', 'phương trình bậc nhất một ẩn', 'An equation of the form $ax + b = 0$ with variable $x$ and constants $a, b$, $a \\ne 0$.', 'Phương trình dạng $ax + b = 0$ với $a, b$ là hằng số và $a \\ne 0$.', '$3x - 9 = 0$ is a linear equation whose unique solution is $x = 3$.', '$3x - 9 = 0$ là phương trình bậc nhất có nghiệm duy nhất $x = 3$.'),
        v('g8l25-v2', 'solution / solution set', 'n phr', 'nghiệm / tập nghiệm', 'A number satisfying the equation and the set $S$ of all solutions.', 'Giá trị làm hai vế bằng nhau và tập hợp $S$ gồm tất cả các nghiệm.', 'The solution set of $2x + 6 = 0$ is $S = \\{-3\\}$.', 'Tập nghiệm của $2x + 6 = 0$ là $S = \\{-3\\}$.'),
      ],
      [
        n('g8l25-n1', 'ax + b = 0 \\;(a \\ne 0) \\Rightarrow x = -\\frac{b}{a}', 'a x plus b equals zero implies x equals negative b over a', 'a x cộng b bằng 0 suy ra x bằng trừ b phần a'),
      ],
      [
        e('g8l25-e1', 'describe', 'Clearing denominators by multiplying both sides by a nonzero common multiple simplifies fractional equations.', 'Nhân cả hai vế với mẫu chung khác $0$ giúp khử mẫu nhanh chóng.'),
        e('g8l25-e2', 'question', 'Is $0x + 5 = 0$ a linear equation in one variable?', 'Phương trình $0x + 5 = 0$ có phải phương trình bậc nhất một ẩn không?'),
        e('g8l25-e3', 'present', 'No, because the coefficient of $x$ is $0$; that equation has no solution.', 'Không, vì hệ số $a = 0$; phương trình đó vô nghiệm.'),
      ],
      [
        ex(
          'g8l25-ex1',
          'Solving a linear equation with denominators',
          'Giải phương trình có mẫu số hằng số',
          'Solve $\\frac{x - 1}{2} + \\frac{2x + 1}{3} = 2$.',
          'Giải phương trình $\\frac{x - 1}{2} + \\frac{2x + 1}{3} = 2$.',
          [
            s('Step 1: Clear denominators (multiply by $6$)', 'Bước 1: Quy đồng khử mẫu (nhân cả hai vế với $6$)', '$3(x - 1) + 2(2x + 1) = 12$.', '$3(x - 1) + 2(2x + 1) = 12$.'),
            s('Step 2: Expand and isolate $x$', 'Bước 2: Khai triển và tìm $x$', '$3x - 3 + 4x + 2 = 12 \\Rightarrow 7x = 13 \\Rightarrow x = \\frac{13}{7}$.', '$7x - 1 = 12 \\Rightarrow 7x = 13 \\Rightarrow x = \\frac{13}{7}$.'),
          ],
          'The solution is $x = \\frac{13}{7}$.',
          'Nghiệm của phương trình là $x = \\frac{13}{7}$.'
        ),
      ],
      ['Luôn nhấn mạnh điều kiện $a \\ne 0$ trong định nghĩa $ax + b = 0$.']
    ),
    lesson(
      8, 7, 26,
      'Solving Word Problems Using Linear Equations',
      'Giải bài toán bằng cách lập phương trình',
      ['Follow the 3-step modeling process: define unknown & conditions, form equation, solve & check.', 'Model motion ($d = v \\cdot t$), age, and percentage/geometry word problems.'],
      ['Thực hiện đủ $3$ bước giải bài toán bằng cách lập phương trình.', 'Giải các dạng toán chuyển động, năng suất, phần trăm và hình học.'],
      [
        v('g8l26-v1', 'distance / speed / time', 'n', 'quãng đường / vận tốc / thời gian', 'Fundamental motion relation $d = v \\cdot t$.', 'Công thức chuyển động cơ bản $s = v \\cdot t$.', 'If distance is $x\\text{ km}$ and speed is $40\\text{ km/h}$, time is $\\frac{x}{40}$ hours.', 'Nếu quãng đường là $x$ km và vận tốc $40$ km/h thì thời gian là $\\frac{x}{40}$ giờ.'),
        v('g8l26-v2', 'check against conditions', 'v phr', 'đối chiếu điều kiện', 'Verifying that the algebraic root satisfies positivity, integer, or domain constraints.', 'Kiểm tra giá trị $x$ vừa giải có thỏa mãn điều kiện thực tế ban đầu không.', 'Check $x > 0$ before concluding the final answer.', 'Kiểm tra $x > 0$ trước khi kết luận.'),
      ],
      [
        n('g8l26-n1', 't_{\\text{there}} + t_{\\text{back}} = T', 'time going plus time returning equals total time', 'thời gian đi cộng thời gian về bằng tổng thời gian'),
      ],
      [
        e('g8l26-e1', 'describe', 'If the return trip is $10\\text{ km/h}$ faster than the outbound trip, write the return speed as $v + 10$.', 'Nếu lúc về nhanh hơn lúc đi $10$ km/h thì vận tốc lúc về là $v + 10$.'),
        e('g8l26-e2', 'question', 'Convert $20$ minutes into hours before inserting into a km/h equation.', 'Đổi $20$ phút ra giờ trước khi lập phương trình theo đơn vị km/h.'),
        e('g8l26-e3', 'present', 'Equating the total time gives $\\frac{x}{40} + \\frac{x}{50} = 4.5$.', 'Ta lập được phương trình tổng thời gian $\\frac{x}{40} + \\frac{x}{50} = 4{,}5$.'),
      ],
      [
        ex(
          'g8l26-ex1',
          'Round-trip motion problem',
          'Bài toán chuyển động đi và về',
          'A car travels from $A$ to $B$ at $40\\text{ km/h}$ and returns along the same route at $50\\text{ km/h}$. Total travel time is $4.5$ hours. Find distance $AB$.',
          'Một ô tô đi từ $A$ đến $B$ với vận tốc $40$ km/h rồi quay về với vận tốc $50$ km/h. Tổng thời gian đi và về là $4{,}5$ giờ. Tính quãng đường $AB$.',
          [
            s('Step 1: Define variable', 'Bước 1: Đặt ẩn và điều kiện', 'Let $x$ ($\\text{km}, x > 0$) be distance $AB$.', 'Gọi $x$ (km, $x > 0$) là độ dài quãng đường $AB$.'),
            s('Step 2: Form and solve equation', 'Bước 2: Lập và giải phương trình', '$\\frac{x}{40} + \\frac{x}{50} = \\frac{9}{2}$. Multiplying by $200$: $5x + 4x = 900 \\Rightarrow 9x = 900 \\Rightarrow x = 100$.', '$\\frac{x}{40} + \\frac{x}{50} = \\frac{9}{2} \\Rightarrow 9x = 900 \\Rightarrow x = 100$ (TMĐK).'),
          ],
          'Distance $AB$ is $100\\text{ km}$.',
          'Quãng đường $AB$ dài $100\\text{ km}$.'
        ),
      ],
      ['Dùng bảng 3 cột `s – v – t` giúp học sinh lập phương trình chuẩn xác hơn nhiều.']
    ),
    lesson(
      8, 7, 27,
      'Concept of Function and Graph of a Function',
      'Khái niệm hàm số và đồ thị của hàm số',
      ['Define function $y = f(x)$, independent/dependent variables, and compute $f(x_0)$.', 'Plot points $(x_0, y_0)$ on the Cartesian coordinate plane $Oxy$ and identify quadrants.'],
      ['Nêu khái niệm hàm số $y = f(x)$ và tính giá trị hàm số tại $x_0$.', 'Xác định tọa độ điểm $(x_0; y_0)$ và bốn góc phần tư trên mặt phẳng tọa độ $Oxy$.'],
      [
        v('g8l27-v1', 'function', 'n', 'hàm số', 'A rule assigning each value of $x$ to exactly one corresponding value of $y$.', 'Quy tắc cho mỗi giá trị của $x$ tương ứng với duy nhất một giá trị của $y$.', 'If $y = 2x + 1$, then $y$ is a function of $x$.', 'Nếu $y = 2x + 1$ thì $y$ là một hàm số của $x$.'),
        v('g8l27-v2', 'Cartesian coordinate plane / x-axis / y-axis / origin', 'n phr', 'mặt phẳng tọa độ / trục hoành / trục tung / gốc tọa độ', 'Two perpendicular number lines $Ox$ (horizontal) and $Oy$ (vertical) meeting at $O(0,0)$.', 'Hai trục số $Ox$ nằm ngang và $Oy$ thẳng đứng vuông góc tại gốc $O(0; 0)$.', 'Point $P(3, -2)$ has $x$-coordinate (abscissa) $3$ and $y$-coordinate (ordinate) $-2$.', 'Điểm $P(3; -2)$ có hoành độ $3$ và tung độ $-2$.'),
        v('g8l27-v3', 'quadrant', 'n', 'góc phần tư', 'One of the four regions (I, II, III, IV) formed by the coordinate axes, ordered counterclockwise.', 'Bốn vùng chia bởi hai trục tọa độ đánh số ngược chiều kim đồng hồ.', 'In Quadrant II, $x < 0$ and $y > 0$.', 'Ở góc phần tư thứ II, hoành độ âm và tung độ dương.'),
      ],
      [
        n('g8l27-n1', 'P(x_0, y_0)', 'point P with coordinates x naught, y naught', 'điểm P có tọa độ x không, y không', 'English uses comma $(3, -2)$; Vietnamese uses semicolon $(3; -2)$.', 'Tiếng Anh viết dấu phẩy $(3, -2)$; tiếng Việt viết dấu chấm phẩy $(3; -2)$.'),
      ],
      [
        e('g8l27-e1', 'describe', 'All points lying on the $x$-axis have $y$-coordinate $0$; all points on the $y$-axis have $x$-coordinate $0$.', 'Mọi điểm trên trục hoành có tung độ bằng $0$; mọi điểm trên trục tung có hoành độ bằng $0$.'),
        e('g8l27-e2', 'question', 'Given $f(x) = x^2 - 3$, calculate $f(-2)$ and $f(0)$.', 'Cho hàm số $f(x) = x^2 - 3$, tính $f(-2)$ và $f(0)$.'),
        e('g8l27-e3', 'present', 'Substituting $x = -2$ gives $f(-2) = (-2)^2 - 3 = 1$, so $(-2, 1)$ lies on the graph.', 'Thay $x = -2$ được $f(-2) = 1$, nên điểm $(-2; 1)$ thuộc đồ thị hàm số.'),
      ],
      [
        ex(
          'g8l27-ex1',
          'Evaluating a function and locating quadrants',
          'Tính giá trị hàm số và xác định góc phần tư',
          'For $y = f(x) = 3x - 4$, find $f(1)$ and $f(-1)$ and name the quadrant of each corresponding point.',
          'Cho hàm số $y = f(x) = 3x - 4$. Tính $f(1), f(-1)$ và cho biết mỗi điểm đồ thị thuộc góc phần tư nào.',
          [
            s('Step 1: Compute points', 'Bước 1: Tính tọa độ hai điểm', '$f(1) = 3(1) - 4 = -1 \\to A(1, -1)$; $f(-1) = 3(-1) - 4 = -7 \\to B(-1, -7)$.', '$A(1; -1)$ và $B(-1; -7)$.'),
            s('Step 2: Identify quadrants', 'Bước 2: Xác định góc phần tư', '$A(1, -1)$ has $x > 0, y < 0$ (Quadrant IV); $B(-1, -7)$ has $x < 0, y < 0$ (Quadrant III).', '$A$ thuộc góc phần tư IV; $B$ thuộc góc phần tư III.'),
          ],
          '$f(1) = -1$ (Quadrant IV); $f(-1) = -7$ (Quadrant III).',
          '$f(1) = -1$ (góc phần tư IV); $f(-1) = -7$ (góc phần tư III).'
        ),
      ],
      ['Dạy học sinh quy ước đánh số 4 góc phần tư I, II, III, IV ngược chiều kim đồng hồ từ góc trên bên phải.']
    ),
    lesson(
      8, 7, 28,
      'Linear Functions and Their Graphs',
      'Hàm số bậc nhất và đồ thị của hàm số bậc nhất',
      ['Define a linear function $y = ax + b$ ($a \\ne 0$) and note its straight-line graph.', 'Graph $y = ax + b$ quickly by finding its $y$-intercept $(0, b)$ and $x$-intercept $(-\\frac{b}{a}, 0)$.'],
      ['Nhận biết hàm số bậc nhất $y = ax + b$ ($a \\ne 0$).', 'Vẽ đồ thị hàm số bậc nhất bằng hai giao điểm với trục tung và trục hoành.'],
      [
        v('g8l28-v1', 'linear function', 'n phr', 'hàm số bậc nhất', 'A function defined by $y = ax + b$ where $a \\ne 0$ and $b$ are constants.', 'Hàm số cho bởi công thức $y = ax + b$ với $a, b$ là các số cho trước và $a \\ne 0$.', 'When $b = 0$, $y = ax$ passes directly through the origin $O(0, 0)$.', 'Khi $b = 0$, đồ thị $y = ax$ đi qua gốc tọa độ $O(0; 0)$.'),
        v('g8l28-v2', 'y-intercept / x-intercept', 'n phr', 'tung độ gốc / giao điểm trục hoành', 'Points $(0, b)$ where the line crosses $Oy$ and $(-\\frac{b}{a}, 0)$ where it crosses $Ox$.', 'Giao điểm của đường thẳng với trục tung $Oy$ và trục hoành $Ox$.', 'The $y$-intercept of $y = 2x - 4$ is $(0, -4)$.', 'Đồ thị $y = 2x - 4$ cắt trục tung tại điểm $(0; -4)$.'),
      ],
      [
        n('g8l28-n1', 'y = ax + b \\;(a \\ne 0)', 'y equals a x plus b, where a is nonzero', 'hàm số bậc nhất y bằng a x cộng b với a khác 0'),
      ],
      [
        e('g8l28-e1', 'describe', 'The graph of $y = ax + b$ ($a \\ne 0$) is a straight line cutting the $y$-axis at $(0, b)$.', 'Đồ thị hàm số $y = ax + b$ ($a \\ne 0$) là một đường thẳng cắt trục tung tại điểm $(0; b)$.'),
        e('g8l28-e2', 'question', 'To draw the line $y = -2x + 6$, which two intercepts are easiest to plot?', 'Để vẽ đường thẳng $y = -2x + 6$, lấy hai giao điểm nào với các trục tọa độ là thuận tiện nhất?'),
        e('g8l28-e3', 'present', 'Setting $x = 0$ gives $(0, 6)$ and setting $y = 0$ gives $(3, 0)$; connect these two points.', 'Cho $x = 0 \\Rightarrow y = 6$; cho $y = 0 \\Rightarrow x = 3$; nối hai điểm $(0; 6)$ và $(3; 0)$.'),
      ],
      [
        ex(
          'g8l28-ex1',
          'Finding intercepts and graphing',
          'Tìm giao điểm và vẽ đồ thị y = ax + b',
          'Find the $x$- and $y$-intercepts of $d: y = 3x - 6$ and find the area of triangle $OAB$ formed with the axes.',
          'Tìm giao điểm của $d: y = 3x - 6$ với hai trục tọa độ và tính diện tích $\\triangle OAB$.',
          [
            s('Step 1: Find intercepts $A$ and $B$', 'Bước 1: Tìm giao điểm $A$ và $B$', 'With $Oy$ ($x = 0$): $A(0, -6) \\Rightarrow OA = 6$. With $Ox$ ($y = 0$): $B(2, 0) \\Rightarrow OB = 2$.', '$A(0; -6) \\Rightarrow OA = 6$; $B(2; 0) \\Rightarrow OB = 2$.'),
            s('Step 2: Area of right $\\triangle OAB$', 'Bước 2: Tính diện tích tam giác vuông $OAB$', '$S_{\\triangle OAB} = \\frac{1}{2} OA \\cdot OB = \\frac{1}{2} \\cdot 6 \\cdot 2 = 6$.', '$S_{\\triangle OAB} = \\frac{1}{2} \\cdot 6 \\cdot 2 = 6$ (đvdt).'),
          ],
          'Intercepts are $(0, -6)$ and $(2, 0)$; area is $6$ square units.',
          'Giao điểm $(0; -6)$ và $(2; 0)$; diện tích bằng $6$.'
        ),
      ],
      ['Luôn nhắc dùng giá trị tuyệt đối $|x_B|, |y_A|$ khi tính độ dài đoạn $OA, OB$ nếu tọa độ âm!']
    ),
    lesson(
      8, 7, 29,
      'Slope of the Line y = ax + b',
      'Hệ số góc của đường thẳng y = ax + b (a ≠ 0)',
      ['Define the slope (gradient) $a$ and relate its sign to increasing/decreasing lines.', 'Identify parallel lines ($a = a\', b \\ne b\'$) and intersecting lines ($a \\ne a\'$).'],
      ['Nêu ý nghĩa hệ số góc $a$ và liên hệ với góc tạo bởi đường thẳng và tia $Ox$.', 'Nhận biết hai đường thẳng song song ($a = a\', b \\ne b\'$) và cắt nhau ($a \\ne a\'$).'],
      [
        v('g8l29-v1', 'slope / gradient', 'n', 'hệ số góc', 'Coefficient $a$ in $y = ax + b$, measuring steepness and direction.', 'Hệ số $a$ trong $y = ax + b$, quyết định độ dốc và hướng của đường thẳng.', 'If $a > 0$, the line slopes upward from left to right (acute angle with $Ox$); if $a < 0$, it slopes downward (obtuse angle).', 'Nếu $a > 0$, góc với tia $Ox$ nhọn; nếu $a < 0$, góc với tia $Ox$ tù.'),
        v('g8l29-v2', 'parallel / coincident / intersecting lines', 'n phr', 'hai đường thẳng song song / trùng nhau / cắt nhau', 'Conditions: parallel ($a = a\', b \\ne b\'$), coincident ($a = a\', b = b\'$), intersecting ($a \\ne a\'$).', 'Điều kiện song song ($a = a\', b \\ne b\'$), trùng ($a = a\', b = b\'$), cắt ($a \\ne a\'$).', 'Two lines with equal slopes and different $y$-intercepts are parallel.', 'Hai đường thẳng có cùng hệ số góc và tung độ gốc khác nhau thì song song.'),
      ],
      [
        n('g8l29-n1', 'd \\parallel d\' \\Leftrightarrow a = a\' \\text{ and } b \\ne b\'', 'two lines are parallel if and only if they have equal slopes and distinct y-intercepts', 'hai đường thẳng song song khi cùng hệ số góc và khác tung độ gốc'),
      ],
      [
        e('g8l29-e1', 'describe', 'For positive slopes, a larger slope makes the line steeper and forms a larger acute angle with the positive $x$-axis.', 'Với $a > 0$, hệ số góc càng lớn thì đường thẳng càng dốc và góc nhọn càng lớn.'),
        e('g8l29-e2', 'question', 'Find the linear function whose graph is parallel to $y = -3x + 1$ and passes through $(2, -4)$.', 'Tìm hàm số bậc nhất có đồ thị song song với $y = -3x + 1$ và đi qua $(2; -4)$.'),
        e('g8l29-e3', 'present', 'Since the line is parallel to $y = -3x + 1$, its slope is $a = -3$.', 'Vì song song với $y = -3x + 1$ nên hệ số góc là $a = -3$ và $b \\ne 1$.'),
      ],
      [
        ex(
          'g8l29-ex1',
          'Finding a parallel line through a point',
          'Tìm phương trình đường thẳng song song qua một điểm',
          'Find $a$ and $b$ so that $y = ax + b$ is parallel to $y = 2x - 5$ and passes through $M(1, 4)$.',
          'Tìm $a, b$ để đường thẳng $y = ax + b$ song song với $y = 2x - 5$ và đi qua $M(1; 4)$.',
          [
            s('Step 1: Apply parallel condition', 'Bước 1: Điều kiện song song', '$a = 2$ and $b \\ne -5$, so $y = 2x + b$.', '$a = 2$ và $b \\ne -5$.'),
            s('Step 2: Substitute point $M(1, 4)$', 'Bước 2: Thay tọa độ $M(1; 4)$', '$4 = 2(1) + b \\Rightarrow b = 2$ ($2 \\ne -5$, valid).', '$4 = 2(1) + b \\Rightarrow b = 2$ (thỏa mãn $b \\ne -5$).'),
          ],
          'The required linear function is $y = 2x + 2$.',
          'Hàm số cần tìm là $y = 2x + 2$.'
        ),
      ],
      ['Tiếng Anh Mỹ dùng `slope` ($m$ trong $y = mx + c/b$), tiếng Anh Anh hay dùng `gradient`. Nên giới thiệu cả hai tên gọi này.']
    ),
  ]),
  chapter(8, 8, 'Getting to Know Probability of Random Events', 'Mở đầu về tính xác suất của biến cố', [
    lesson(
      8, 8, 30,
      'Possible Outcomes and Favourable Outcomes',
      'Kết quả có thể và kết quả thuận lợi',
      ['List all possible outcomes accurately in random trials.', 'Identify favorable outcomes belonging to a given event $E$.'],
      ['Liệt kê đầy đủ tập hợp các kết quả có thể của phép thử.', 'Xác định các kết quả thuận lợi cho biến cố $E$.'],
      [
        v('g8l30-v1', 'possible outcomes / sample space', 'n phr', 'kết quả có thể / không gian mẫu', 'All distinct results that can occur in a single trial.', 'Tất cả các kết quả có thể xảy ra của phép thử.', 'List all two-digit multiples of $10$ when picking from $\\{10, 20, \\dots, 90\\}$.', 'Liệt kê các số tròn chục có hai chữ số.'),
        v('g8l30-v2', 'favourable outcome (UK) / favorable outcome (US)', 'n phr', 'kết quả thuận lợi', 'Any outcome that satisfies the condition defining event $E$.', 'Mỗi kết quả làm cho biến cố $E$ xảy ra.', 'Out of numbers $1$ to $10$, the favourable outcomes for "divisible by $4$" are $4$ and $8$.', 'Từ $1$ đến $10$, kết quả thuận lợi cho biến cố "chia hết cho $4$" là $4$ và $8$.'),
      ],
      [
        n('g8l30-n1', 'n(E) \\le n(\\Omega)', 'the number of favourable outcomes never exceeds the total number of outcomes', 'số kết quả thuận lợi không vượt quá tổng số kết quả có thể'),
      ],
      [
        e('g8l30-e1', 'describe', 'Favourable outcomes always form a subset of all possible outcomes.', 'Tập các kết quả thuận lợi luôn là một tập con của tập các kết quả có thể.'),
        e('g8l30-e2', 'question', 'How many favourable outcomes correspond to getting a prime number on a standard die?', 'Có bao nhiêu kết quả thuận lợi cho biến cố gieo được số chấm là số nguyên tố?'),
        e('g8l30-e3', 'present', 'Only faces $2, 3,$ and $5$ are prime, giving $3$ favourable outcomes.', 'Chỉ có mặt $2; 3; 5$ là số nguyên tố nên có $3$ kết quả thuận lợi.'),
      ],
      [
        ex(
          'g8l30-ex1',
          'Counting possible and favourable outcomes',
          'Đếm kết quả có thể và kết quả thuận lợi',
          'Cards numbered $1$ through $15$ are placed in a box and one is drawn at random. Count all outcomes and outcomes that are perfect squares.',
          'Hộp đựng $15$ thẻ đánh số từ $1$ đến $15$. Rút ngẫu nhiên $1$ thẻ. Đếm số kết quả có thể và số kết quả thuận lợi cho biến cố "rút được số chính phương".',
          [
            s('Step 1: Possible outcomes', 'Bước 1: Số kết quả có thể', 'There are $15$ possible outcomes ($1$ through $15$).', 'Có $15$ kết quả có thể.'),
            s('Step 2: Favourable outcomes', 'Bước 2: Kết quả thuận lợi', 'Perfect squares in $1$–$15$ are $1, 4, 9$ ($3$ outcomes).', 'Các số chính phương từ $1$ đến $15$ là $1; 4; 9$ ($3$ kết quả).'),
          ],
          '$15$ possible outcomes and $3$ favourable outcomes.',
          'Có $15$ kết quả có thể và $3$ kết quả thuận lợi.'
        ),
      ],
      ['Chú ý: Số $1 = 1^2$ là số chính phương (perfect square), không phải số nguyên tố!']
    ),
    lesson(
      8, 8, 31,
      'How to Calculate Probability of an Event Using a Ratio',
      'Cách tính xác suất của biến cố bằng tỉ số',
      ['Compute theoretical probability $P(E) = \\frac{k}{n}$ for equally likely outcomes.', 'Compare experimental probability (from trials) and theoretical probability.'],
      ['Tính xác suất lí thuyết của biến cố đồng khả năng bằng tỉ số $P(E) = \\frac{k}{n}$.', 'Phân biệt xác suất lí thuyết và xác suất thực nghiệm.'],
      [
        v('g8l31-v1', 'theoretical probability', 'n phr', 'xác suất lí thuyết', 'Ratio $\\frac{k}{n}$ of $k$ favourable outcomes to $n$ equally likely possible outcomes.', 'Tỉ số $\\frac{k}{n}$ giữa số kết quả thuận lợi và tổng số kết quả đồng khả năng.', 'Each sector on a fair spinner is equally likely.', 'Mỗi ô bằng nhau trên vòng quay cân đối là đồng khả năng.'),
      ],
      [
        n('g8l31-n1', 'P(E) = \\frac{k}{n}', 'probability of E equals k favourable outcomes over n total outcomes', 'xác suất biến cố E bằng số kết quả thuận lợi k chia tổng số kết quả n'),
      ],
      [
        e('g8l31-e1', 'describe', 'Always confirm outcomes are equally likely before applying the ratio $\\frac{k}{n}$.', 'Luôn kiểm tra điều kiện đồng khả năng trước khi dùng công thức tỉ số $\\frac{k}{n}$.'),
        e('g8l31-e2', 'question', 'Out of $5$ red, $3$ blue, and $2$ yellow marbles, what is the probability of drawing a non-yellow marble?', 'Có $5$ bi đỏ, $3$ bi xanh, $2$ bi vàng. Tính xác suất rút được bi không phải màu vàng.'),
        e('g8l31-e3', 'present', 'There are $5 + 3 = 8$ non-yellow marbles out of $10$, so $P = \\frac{8}{10} = 0.8$.', 'Có $8$ bi không vàng trên tổng số $10$ bi nên $P = \\frac{8}{10} = 0{,}8$.'),
      ],
      [
        ex(
          'g8l31-ex1',
          'Probability of selecting a class representative',
          'Tính xác suất chọn học sinh',
          'A group has $12$ boys and $18$ girls. One student is chosen at random. Find the probability of selecting a boy.',
          'Một tổ có $12$ bạn nam và $18$ bạn nữ. Chọn ngẫu nhiên $1$ bạn. Tính xác suất chọn được bạn nam.',
          [
            s('Step 1: Total outcomes', 'Bước 1: Tổng số kết quả', '$n = 12 + 18 = 30$ equally likely students.', '$n = 12 + 18 = 30$ kết quả đồng khả năng.'),
            s('Step 2: Divide favourable by total', 'Bước 2: Tính tỉ số', '$P(\\text{boy}) = \\frac{12}{30} = \\frac{2}{5} = 0.4$.', '$P(\\text{nam}) = \\frac{12}{30} = \\frac{2}{5} = 0{,}4$.'),
          ],
          'The probability is $\\frac{2}{5}$ ($40\\%$).',
          'Xác suất chọn được bạn nam là $\\frac{2}{5}$ ($40\\%$).'
        ),
      ],
      ['Khuyến khích viết đáp án ở dạng phân số tối giản kèm giá trị thập phân/phần trăm để dễ so sánh.']
    ),
    lesson(
      8, 8, 32,
      'Relationship Between Experimental Probability and Theoretical Probability',
      'Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng',
      ['Connect experimental frequency ratios over large trials $n$ to theoretical probability $P(E)$.', 'Estimate unknown counts in a population using experimental or theoretical proportions.'],
      ['Liên hệ sự tiệm cận giữa xác suất thực nghiệm (khi số phép thử lớn) với xác suất lí thuyết.', 'Ước lượng số phần tử của tập hợp bằng xác suất thực nghiệm.'],
      [
        v('g8l32-v1', 'large number of trials', 'n phr', 'số lần thử lớn', 'Repeating an experiment many times so the experimental probability gets close to the theoretical probability.', 'Thực hiện phép thử rất nhiều lần để xác suất thực nghiệm tiến gần đến xác suất lí thuyết.', 'As trials increase, experimental probability fluctuates less and approaches $P(E)$.', 'Số lần thử càng lớn thì xác suất thực nghiệm càng ổn định gần $P(E)$.'),
        v('g8l32-v2', 'population estimate', 'n phr', 'ước lượng số lượng quần thể', 'Using $\\frac{k}{n} \\approx \\frac{\\text{sample}}{N}$ to estimate total items or fish in a pond.', 'Dùng tỉ lệ thực nghiệm để ước lượng số lượng phần tử thực tế chưa biết.', 'Estimate the defective rate in a factory batch from inspected items.', 'Ước lượng tỉ lệ sản phẩm lỗi trong cả lô hàng từ mẫu kiểm tra.'),
      ],
      [
        n('g8l32-n1', '\\frac{k}{n} \\approx P(E) \\text{ when } n \\text{ is large}', 'experimental probability approximates theoretical probability for large n', 'xác suất thực nghiệm xấp xỉ xác suất khi số lần thử n lớn'),
      ],
      [
        e('g8l32-e1', 'describe', 'When theoretical probability is hard to calculate directly, a large experiment provides a reliable estimate.', 'Khi khó tính trực tiếp xác suất lí thuyết, có thể làm nhiều lần thử nghiệm để ước lượng.'),
        e('g8l32-e2', 'question', 'If $12$ out of $400$ tested bulbs are defective, how many defective bulbs do we expect in $2\\,000$ bulbs?', 'Nếu kiểm tra $400$ bóng đèn thấy $12$ bóng lỗi, dự đoán có bao nhiêu bóng lỗi trong lô $2\\,000$ bóng?'),
        e('g8l32-e3', 'present', 'Estimated defective probability is $\\frac{12}{400} = 0.03$, predicting $2\\,000 \\times 0.03 = 60$ bulbs.', 'Xác suất thực nghiệm lỗi là $0{,}03$, dự đoán có $2\\,000 \\times 0{,}03 = 60$ bóng lỗi.'),
      ],
      [
        ex(
          'g8l32-ex1',
          'Estimating fish population (capture-recapture style / sampling)',
          'Ước lượng số lượng bằng xác suất thực nghiệm',
          'In a box of $50$ colored balls, $100$ draws with replacement produce $38$ red balls. Estimate the number of red balls in the box.',
          'Trong hộp có $50$ quả bóng, rút có hoàn lại $100$ lần thấy có $38$ lần ra bóng đỏ. Ước lượng số bóng đỏ trong hộp.',
          [
            s('Step 1: Experimental probability', 'Bước 1: Tính xác suất thực nghiệm', '$P_{\\text{exp}}(\\text{red}) = \\frac{38}{100} = 0.38$.', '$P_{tn}(\\text{đỏ}) = \\frac{38}{100} = 0{,}38$.'),
            s('Step 2: Multiply by total $50$', 'Bước 2: Nhân với tổng $50$ bóng', 'Estimated red balls $\\approx 50 \\times 0.38 = 19$.', 'Số bóng đỏ ước lượng khoảng $50 \\times 0{,}38 = 19$ quả.'),
          ],
          'About $19$ red balls are estimated to be in the box.',
          'Ước lượng có khoảng $19$ quả bóng đỏ trong hộp.'
        ),
      ],
      ['Luôn nhấn mạnh chữ "ước lượng / khoảng" (`approximately / estimate`) vì xác suất thực nghiệm mang tính xấp xỉ.']
    ),
  ]),
  chapter(8, 9, 'Similar Triangles', 'Tam giác đồng dạng', [
    lesson(
      8, 9, 33,
      'Two Similar Triangles',
      'Hai tam giác đồng dạng',
      ['Define similar triangles ($\\triangle A\'B\'C\' \\sim \\triangle ABC$) with equal corresponding angles and proportional sides.', 'Find the similarity ratio $k$ and distinguish similarity ($\\sim$) from congruence ($\\cong$).'],
      ['Nêu định nghĩa hai tam giác đồng dạng và viết đúng thứ tự đỉnh tương ứng.', 'Tìm tỉ số đồng dạng $k$ và áp dụng định lí đường thẳng song song tạo tam giác đồng dạng.'],
      [
        v('g8l33-v1', 'similar triangles', 'n phr', 'hai tam giác đồng dạng', 'Two triangles with equal corresponding angles and proportional corresponding sides.', 'Hai tam giác có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.', 'In $\\triangle A\'B\'C\' \\sim \\triangle ABC$, corresponding vertices must align in order.', 'Trong $\\triangle A\'B\'C\' \\sim \\triangle ABC$, thứ tự các đỉnh tương ứng phải viết đúng.'),
        v('g8l33-v2', 'similarity ratio / scale factor', 'n phr', 'tỉ số đồng dạng', 'The constant ratio $k = \\frac{A\'B\'}{AB} = \\frac{B\'C\'}{BC} = \\frac{A\'C\'}{AC}$.', 'Tỉ số các cặp cạnh tương ứng $k = \\frac{A\'B\'}{AB}$.', 'If $\\triangle A\'B\'C\' \\sim \\triangle ABC$ with ratio $k$, then $\\triangle ABC \\sim \\triangle A\'B\'C\'$ with ratio $\\frac{1}{k}$.', 'Nếu $\\triangle A\'B\'C\' \\sim \\triangle ABC$ tỉ số $k$ thì ngược lại tỉ số là $\\frac{1}{k}$.'),
      ],
      [
        n('g8l33-n1', '\\triangle A\'B\'C\' \\sim \\triangle ABC', 'triangle A prime B prime C prime is similar to triangle A B C', 'tam giác A phẩy B phẩy C phẩy đồng dạng với tam giác ABC'),
      ],
      [
        e('g8l33-e1', 'describe', 'Any line parallel to one side of a triangle intersecting the other two sides (or their extensions) cuts off a triangle similar to the original.', 'Đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại tạo thành tam giác mới đồng dạng với tam giác đã cho.'),
        e('g8l33-e2', 'question', 'If $\\triangle DEF \\sim \\triangle ABC$ with scale factor $k = 2$, what is the ratio of their perimeters?', 'Nếu $\\triangle DEF \\sim \\triangle ABC$ theo tỉ số $2$ thì tỉ số chu vi của chúng bằng bao nhiêu?'),
        e('g8l33-e3', 'present', 'The perimeter ratio also equals the scale factor $k = 2$.', 'Tỉ số chu vi hai tam giác đồng dạng cũng bằng tỉ số đồng dạng $k = 2$.'),
      ],
      [
        ex(
          'g8l33-ex1',
          'Computing sides from similarity ratio',
          'Tính cạnh từ tỉ số đồng dạng',
          'Given $\\triangle A\'B\'C\' \\sim \\triangle ABC$ with ratio $k = \\frac{2}{3}$, and $AB = 6\\text{ cm}, BC = 9\\text{ cm}$. Find $A\'B\'$ and $B\'C\'$.',
          'Cho $\\triangle A\'B\'C\' \\sim \\triangle ABC$ theo tỉ số $k = \\frac{2}{3}$, biết $AB = 6\\text{ cm}, BC = 9\\text{ cm}$. Tính $A\'B\'$ và $B\'C\'$.',
          [
            s('Step 1: Write ratio equation', 'Bước 1: Viết đẳng thức tỉ số', '$\\frac{A\'B\'}{AB} = \\frac{B\'C\'}{BC} = \\frac{2}{3}$.', '$\\frac{A\'B\'}{AB} = \\frac{B\'C\'}{BC} = \\frac{2}{3}$.'),
            s('Step 2: Multiply by $k$', 'Bước 2: Nhân tìm cạnh', '$A\'B\' = \\frac{2}{3} \\cdot 6 = 4\\text{ cm}$; $B\'C\' = \\frac{2}{3} \\cdot 9 = 6\\text{ cm}$.', '$A\'B\' = 4\\text{ cm}$; $B\'C\' = 6\\text{ cm}$.'),
          ],
          '$A\'B\' = 4\\text{ cm}$ and $B\'C\' = 6\\text{ cm}$.',
          'Vậy $A\'B\' = 4\\text{ cm}$ và $B\'C\' = 6\\text{ cm}$.'
        ),
      ],
      ['Lưu ý kí hiệu: $\\backsim$ hoặc $\\sim$ trong tiếng Anh có nghĩa giống kí hiệu đồng dạng ở Việt Nam. Nhắc viết đúng thứ tự tương ứng của đỉnh.']
    ),
    lesson(
      8, 9, 34,
      'Three Similarity Criteria of Two Triangles',
      'Ba trường hợp đồng dạng của hai tam giác',
      ['Prove triangle similarity via SSS, SAS, and AA (Angle–Angle).', 'Verify side proportionality in ascending length order for SSS and included-angle equality for SAS.'],
      ['Chứng minh hai tam giác đồng dạng theo c.c.c (SSS), c.g.c (SAS) và g.g (AA).', 'Sắp xếp độ dài ba cạnh từ nhỏ đến lớn trước khi kiểm tra tỉ số c.c.c.'],
      [
        v('g8l34-v1', 'Side–Side–Side (SSS) / Side–Angle–Side (SAS) / Angle–Angle (AA)', 'n phr', 'c.c.c / c.g.c / g.g', 'The three triangle similarity criteria.', 'Ba trường hợp đồng dạng của hai tam giác.', 'Angle–Angle (AA) is the most frequently used criterion in geometric proofs.', 'Trường hợp góc – góc (AA) là dấu hiệu hay dùng nhất trong chứng minh hình học.'),
      ],
      [
        n('g8l34-n1', '\\widehat{A\'} = \\widehat{A}, \\; \\widehat{B\'} = \\widehat{B} \\Rightarrow \\triangle A\'B\'C\' \\sim \\triangle ABC \\;(\\text{AA})', 'two pairs of equal angles imply similarity by Angle-Angle', 'hai góc bằng nhau suy ra hai tam giác đồng dạng theo trường hợp góc góc'),
      ],
      [
        e('g8l34-e1', 'describe', 'For SSS similarity, sort sides from shortest to longest before comparing the three ratios.', 'Khi kiểm tra c.c.c, luôn xếp độ dài ba cạnh theo thứ tự tăng dần để chia cặp tương ứng.'),
        e('g8l34-e2', 'question', 'Which common angle helps prove $\\triangle ABD \\sim \\triangle ACB$ when $\\angle ABD = \\angle ACB$?', 'Góc chung nào giúp chứng minh $\\triangle ABD \\sim \\triangle ACB$ khi biết $\\widehat{ABD} = \\widehat{ACB}$?'),
        e('g8l34-e3', 'present', 'With shared $\\angle A$ and $\\angle ABD = \\angle ACB$, the triangles are similar by AA, giving $AB^2 = AD \\cdot AC$.', 'Có góc $A$ chung và $\\widehat{ABD} = \\widehat{ACB}$, suy ra đồng dạng (g.g), từ đó $AB^2 = AD \\cdot AC$.'),
      ],
      [
        ex(
          'g8l34-ex1',
          'Proving similarity and product identity via AA',
          'Chứng minh đồng dạng (g.g) và suy ra đẳng thức tích',
          'In $\\triangle ABC$, take $D$ on $AC$ such that $\\angle ABD = \\angle ACB$. Prove $\\triangle ABD \\sim \\triangle ACB$ and $AB^2 = AD \\cdot AC$.',
          'Cho $\\triangle ABC$, lấy $D \\in AC$ sao cho $\\widehat{ABD} = \\widehat{ACB}$. Chứng minh $\\triangle ABD \\sim \\triangle ACB$ và $AB^2 = AD \\cdot AC$.',
          [
            s('Step 1: Match two angle pairs', 'Bước 1: Chỉ ra hai cặp góc bằng nhau', '$\\angle A$ is common and $\\angle ABD = \\angle ACB$ (given), so $\\triangle ABD \\sim \\triangle ACB$ (AA).', '$\\widehat{A}$ chung và $\\widehat{ABD} = \\widehat{ACB}$ (gt) $\\Rightarrow \\triangle ABD \\sim \\triangle ACB$ (g.g).'),
            s('Step 2: Deduce side proportion', 'Bước 2: Lập tỉ số cạnh', '$\\frac{AB}{AC} = \\frac{AD}{AB} \\Rightarrow AB^2 = AD \\cdot AC$.', '$\\frac{AB}{AC} = \\frac{AD}{AB} \\Rightarrow AB^2 = AD \\cdot AC$.'),
          ],
          'Hence $\\triangle ABD \\sim \\triangle ACB$ and $AB^2 = AD \\cdot AC$.',
          'Vậy $\\triangle ABD \\sim \\triangle ACB$ và $AB^2 = AD \\cdot AC$.'
        ),
      ],
      ['Dạy quy trình suy ngược đẳng thức tích $AB^2 = AD \\cdot AC$: viết $\\frac{AB}{AD} = \\frac{AC}{AB}$ rồi ghép chữ hàng ngang/dọc để chọn cặp tam giác!']
    ),
    lesson(
      8, 9, 35,
      'The Pythagorean Theorem and Its Converse',
      'Định lí Pythagore và ứng dụng',
      ['State and apply the Pythagorean theorem $c^2 = a^2 + b^2$ and its converse.', 'Compute heights, diagonals, and real-world ladder/screen lengths.'],
      ['Phát biểu và vận dụng định lí Pythagore thuận và đảo.', 'Tính độ dài cạnh trong tam giác vuông và bài toán thực tế.'],
      [
        v('g8l35-v1', 'Pythagorean theorem / converse', 'n phr', 'định lí Pythagore / định lí đảo', 'In a right triangle, the square of the hypotenuse equals the sum of the squares of the two legs ($c^2 = a^2 + b^2$).', 'Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.', 'If $a^2 + b^2 = c^2$ holds for the three sides, the triangle is right-angled opposite side $c$.', 'Nếu bình phương một cạnh bằng tổng bình phương hai cạnh kia thì tam giác đó vuông.'),
        v('g8l35-v2', 'Pythagorean triple', 'n phr', 'bộ ba số Pythagore', 'Three positive integers $(a, b, c)$ satisfying $a^2 + b^2 = c^2$, like $(3, 4, 5)$ and $(5, 12, 13)$.', 'Bộ ba số nguyên dương thỏa mãn $a^2 + b^2 = c^2$ như $(3; 4; 5)$ và $(5; 12; 13)$.', 'A $6$-$8$-$10$ triangle is right-angled because $6^2 + 8^2 = 10^2$.', 'Tam giác có các cạnh $6; 8; 10$ là tam giác vuông.'),
      ],
      [
        n('g8l35-n1', 'BC^2 = AB^2 + AC^2', 'B C squared equals A B squared plus A C squared', 'bình phương cạnh huyền BC bằng tổng bình phương hai cạnh góc vuông AB và AC'),
      ],
      [
        e('g8l35-e1', 'describe', 'Always identify which side is the hypotenuse (opposite the right angle) before writing $c^2 = a^2 + b^2$.', 'Luôn xác định đúng cạnh huyền nằm đối diện góc vuông trước khi viết đẳng thức Pythagore.'),
        e('g8l35-e2', 'question', 'Is a triangle with sides $7\\text{ cm}, 24\\text{ cm}, 25\\text{ cm}$ a right triangle?', 'Tam giác có ba cạnh $7\\text{ cm}, 24\\text{ cm}, 25\\text{ cm}$ có phải tam giác vuông không?'),
        e('g8l35-e3', 'present', 'Since $7^2 + 24^2 = 49 + 576 = 625 = 25^2$, by the converse theorem it is a right triangle.', 'Vì $7^2 + 24^2 = 625 = 25^2$ nên theo định lí Pythagore đảo, đó là tam giác vuông.'),
      ],
      [
        ex(
          'g8l35-ex1',
          'Ladder against a wall problem',
          'Bài toán cái thang tựa tường',
          'A $5\\text{ m}$ ladder leans against a vertical wall with its foot $3\\text{ m}$ from the wall. How high up the wall does it reach?',
          'Một cái thang dài $5\\text{ m}$ tựa vào tường thẳng đứng, chân thang cách tường $3\\text{ m}$. Thang chạm tới độ cao bao nhiêu?',
          [
            s('Step 1: Model as a right triangle', 'Bước 1: Áp dụng tam giác vuông', 'The ladder is the hypotenuse ($5\\text{ m}$) and the ground distance is one leg ($3\\text{ m}$).', 'Cạnh huyền là $5\\text{ m}$, một cạnh góc vuông là $3\\text{ m}$.'),
            s('Step 2: Apply Pythagorean theorem', 'Bước 2: Tính chiều cao $h$', '$h = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4\\text{ m}$.', '$h = \\sqrt{5^2 - 3^2} = 4\\text{ m}$.'),
          ],
          'The ladder reaches $4\\text{ m}$ up the wall.',
          'Thang chạm tới độ cao $4\\text{ m}$.'
        ),
      ],
      ['Phát âm `Pythagorean` /paɪˌθæɡəˈriːən/ (hoặc `Pythagoras\' theorem` ở Anh).']
    ),
    lesson(
      8, 9, 36,
      'Similarity Criteria for Right Triangles',
      'Các trường hợp đồng dạng của hai tam giác vuông',
      ['Prove two right triangles similar using Acute Angle (AA), Two Legs (SAS), or Hypotenuse–Leg (HL).', 'Compute altitude/area ratios ($k^2$ for areas!) of similar triangles.'],
      ['Chứng minh hai tam giác vuông đồng dạng (góc nhọn, hai cạnh góc vuông, cạnh huyền – cạnh góc vuông).', 'Vận dụng tỉ số đường cao bằng $k$ và tỉ số diện tích bằng $k^2$.'],
      [
        v('g8l36-v1', 'Hypotenuse–Leg similarity', 'n phr', 'cạnh huyền – cạnh góc vuông (đồng dạng)', 'Two right triangles are similar if the ratio of hypotenuses equals the ratio of one pair of legs.', 'Nếu cạnh huyền và một cạnh góc vuông tỉ lệ với cạnh huyền và cạnh góc vuông tương ứng thì hai tam giác vuông đồng dạng.', 'In right triangles, knowing $\\frac{A\'B\'}{AB} = \\frac{B\'C\'}{BC}$ gives similarity.', 'Với hai tam giác vuông, tỉ lệ cạnh huyền – cạnh góc vuông cho tam giác đồng dạng.'),
        v('g8l36-v2', 'ratio of areas ($k^2$)', 'n phr', 'tỉ số diện tích ($k^2$)', 'The ratio of areas of two similar triangles equals the square of their similarity ratio.', 'Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng.', 'If scale factor $k = 3$, the area is $9$ times larger.', 'Nếu tỉ số đồng dạng là $3$ thì diện tích gấp $9$ lần.'),
      ],
      [
        n('g8l36-n1', '\\frac{S_{\\triangle A\'B\'C\'}}{S_{\\triangle ABC}} = k^2', 'the ratio of areas equals k squared', 'tỉ số diện tích hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng'),
      ],
      [
        e('g8l36-e1', 'describe', 'While sides, altitudes, and perimeters scale by $k$, the area scales by $k^2$.', 'Trong khi cạnh, đường cao và chu vi tỉ lệ với $k$, thì diện tích tỉ lệ với $k^2$.'),
        e('g8l36-e2', 'question', 'In right $\\triangle ABC$ with altitude $AH$, name all three similar right triangles.', 'Trong $\\triangle ABC$ vuông tại $A$ có đường cao $AH$, kể tên ba tam giác vuông đồng dạng với nhau.'),
        e('g8l36-e3', 'present', 'We have $\\triangle HBA \\sim \\triangle HAC \\sim \\triangle ABC$ by sharing acute angles.', 'Ta có $\\triangle HBA \\sim \\triangle HAC \\sim \\triangle ABC$ theo trường hợp góc nhọn.'),
      ],
      [
        ex(
          'g8l36-ex1',
          'Altitude in a right triangle and area ratio',
          'Đường cao tam giác vuông và tỉ số diện tích',
          'Given right $\\triangle ABC$ at $A$ with $AB = 6, AC = 8, BC = 10$ and altitude $AH$. Find $AH$ and $\\frac{S_{\\triangle HBA}}{S_{\\triangle HAC}}$.',
          'Cho $\\triangle ABC$ vuông tại $A$ có $AB = 6, AC = 8, BC = 10$, đường cao $AH$. Tính $AH$ và tỉ số $\\frac{S_{\\triangle HBA}}{S_{\\triangle HAC}}$.',
          [
            s('Step 1: Similarity gives $AH$', 'Bước 1: Tính $AH$ từ tam giác đồng dạng hoặc diện tích', '$\\triangle HBA \\sim \\triangle ABC \\Rightarrow \\frac{AH}{AC} = \\frac{AB}{BC} \\Rightarrow AH = \\frac{6 \\cdot 8}{10} = 4.8$.', '$AH = \\frac{AB \\cdot AC}{BC} = 4{,}8$.'),
            s('Step 2: Ratio of areas', 'Bước 2: Tính tỉ số diện tích', '$\\triangle HBA \\sim \\triangle HAC$ with ratio $k = \\frac{AB}{AC} = \\frac{6}{8} = \\frac{3}{4}$, so area ratio $= k^2 = \\frac{9}{16}$.', 'Tỉ số đồng dạng $k = \\frac{3}{4} \\Rightarrow$ tỉ số diện tích $= \\frac{9}{16}$.'),
          ],
          '$AH = 4.8$ and the area ratio is $\\frac{9}{16}$.',
          '$AH = 4{,}8$ và tỉ số diện tích bằng $\\frac{9}{16}$.'
        ),
      ],
      ['Lỗi hay quên bình phương: tỉ số diện tích là $k^2$, không phải $k$!']
    ),
    lesson(
      8, 9, 37,
      'Similar Figures',
      'Hình đồng dạng',
      ['Understand homothetic (scaled) figures and similar plane shapes.', 'Compare scale factors across maps, models, and geometric enlargements/reductions.'],
      ['Nhận biết hai hình đồng dạng phối cảnh (vị tự) và hai hình đồng dạng.', 'Tính kích thước theo tỉ lệ bản đồ hoặc phép phóng to, thu nhỏ.'],
      [
        v('g8l37-v1', 'similar figures / homothetic figures', 'n phr', 'hình đồng dạng / hình đồng dạng phối cảnh', 'Two shapes of the exact same form that can be resized from one to the other by a positive scale factor $k$.', 'Hai hình có cùng hình dạng, hình này nhận được từ hình kia bằng cách phóng to hoặc thu nhỏ theo tỉ số $k$.', 'Any two circles or any two squares are always similar figures.', 'Hai hình tròn bất kì hoặc hai hình vuông bất kì luôn đồng dạng với nhau.'),
        v('g8l37-v2', 'enlargement / reduction', 'n', 'phép phóng to / phép thu nhỏ', 'Scaling with factor $k > 1$ (enlargement) or $0 < k < 1$ (reduction).', 'Biến đổi kích thước với tỉ số $k > 1$ (phóng to) hoặc $0 < k < 1$ (thu nhỏ).', 'A $1 : 100$ architectural model uses scale factor $0.01$.', 'Mô hình kiến trúc tỉ lệ $1 : 100$ dùng hệ số thu nhỏ $0{,}01$.'),
      ],
      [
        n('g8l37-n1', 'OA\' = k \\cdot OA \\;(k > 0)', 'O A prime equals k times O A', 'OA phẩy bằng k nhân OA'),
      ],
      [
        e('g8l37-e1', 'describe', 'Congruent figures are a special case of similar figures with scale factor $k = 1$.', 'Hai hình bằng nhau là trường hợp đặc biệt của hai hình đồng dạng với tỉ số $k = 1$.'),
        e('g8l37-e2', 'question', 'Are any two rectangles necessarily similar to each other?', 'Hai hình chữ nhật bất kì có chắc chắn đồng dạng với nhau không?'),
        e('g8l37-e3', 'present', 'No, because the ratio of length to width can differ between two rectangles.', 'Không, vì tỉ số chiều dài trên chiều rộng của hai hình chữ nhật có thể khác nhau.'),
      ],
      [
        ex(
          'g8l37-ex1',
          'Checking similarity of two rectangles',
          'Kiểm tra hai hình đồng dạng',
          'Rectangle I is $4\\text{ cm} \\times 6\\text{ cm}$. Rectangle II is $6\\text{ cm} \\times 9\\text{ cm}$. Are they similar, and what is the scale factor from I to II?',
          'Hình chữ nhật I kích thước $4\\text{ cm} \\times 6\\text{ cm}$, hình II kích thước $6\\text{ cm} \\times 9\\text{ cm}$. Hai hình có đồng dạng không? Tìm tỉ số.',
          [
            s('Step 1: Compare side ratios', 'Bước 1: So sánh tỉ số các kích thước tương ứng', 'Width ratio: $\\frac{6}{4} = 1.5$. Length ratio: $\\frac{9}{6} = 1.5$.', 'Tỉ số chiều rộng: $\\frac{6}{4} = 1{,}5$; tỉ số chiều dài: $\\frac{9}{6} = 1{,}5$.'),
            s('Step 2: Check angles', 'Bước 2: Kiểm tra các góc', 'All angles are $90^\\circ$, and both side ratios equal $1.5$.', 'Các góc đều bằng $90^\\circ$ và tỉ số cạnh bằng nhau.'),
          ],
          'Yes, they are similar with scale factor $k = 1.5$ (from I to II).',
          'Có, hai hình đồng dạng với tỉ số $1{,}5$.'
        ),
      ],
      ['Dễ nhớ cho học sinh: `Every square/circle/equilateral triangle pair is similar; rectangles depend on length-to-width ratio`.']
    ),
  ]),
  chapter(8, 10, 'Some Solid Shapes in Practice', 'Một số hình khối trong thực tiễn', [
    lesson(
      8, 10, 38,
      'Regular Triangular Pyramids',
      'Hình chóp tam giác đều',
      ['Identify the equilateral-triangle base, apex, height $h$, and slant height $d$ (trung đoạn) of a regular triangular pyramid.', 'Compute lateral surface area $S_{\\text{lat}} = p \\cdot d$ and volume $V = \\frac{1}{3} S_{\\text{base}} \\cdot h$.'],
      ['Nhận biết đáy tam giác đều, đỉnh, chiều cao $h$ và trung đoạn $d$ của hình chóp tam giác đều.', 'Tính diện tích xung quanh ($S_{xq} = p \\cdot d$) và thể tích ($V = \\frac{1}{3} S_{\\text{đáy}} \\cdot h$).'],
      [
        v('g8l38-v1', 'regular triangular pyramid', 'n phr', 'hình chóp tam giác đều', 'A pyramid whose base is an equilateral triangle and whose three lateral faces are congruent isosceles triangles.', 'Hình chóp có đáy là tam giác đều và $3$ mặt bên là các tam giác cân bằng nhau.', 'Notice its $4$ faces are all triangles ($1$ base + $3$ lateral faces).', 'Hình chóp tam giác đều có $4$ mặt đều là tam giác ($1$ đáy + $3$ mặt bên).'),
        v('g8l38-v2', 'slant height', 'n phr', 'trung đoạn', 'The altitude drawn from the apex to the base edge of one lateral isosceles face ($d$).', 'Đường cao kẻ từ đỉnh hình chóp đến cạnh đáy của mỗi mặt bên ($d$).', 'Multiply half the base perimeter ($p$) by the slant height ($d$) to get lateral surface area.', 'Diện tích xung quanh bằng nửa chu vi đáy ($p$) nhân với trung đoạn ($d$).'),
        v('g8l38-v3', 'apex / pyramid height', 'n phr', 'đỉnh chóp / chiều cao hình chóp', 'Top vertex $S$ and the perpendicular distance $SO$ from $S$ to the base plane.', 'Đỉnh $S$ và đoạn vuông góc $SO$ từ đỉnh xuống mặt phẳng đáy.', 'Unlike a prism, a pyramid\'s volume has the factor $\\frac{1}{3}$.', 'Khác với hình lăng trụ, thể tích hình chóp có hệ số $\\frac{1}{3}$.'),
      ],
      [
        n('g8l38-n1', 'S_{\\text{lat}} = \\frac{1}{2} C_{\\text{base}} \\cdot d, \\quad V = \\frac{1}{3} S_{\\text{base}} \\cdot h', 'lateral area equals half the base perimeter times slant height, and volume equals one third base area times height', 'diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn, thể tích bằng một phần ba diện tích đáy nhân chiều cao'),
      ],
      [
        e('g8l38-e1', 'describe', 'Don\'t confuse the slant height $d$ (on a slanted lateral face) with the vertical pyramid height $h$ (inside the pyramid).', 'Đừng nhầm trung đoạn $d$ (nằm trên mặt bên) với chiều cao $h$ của hình chóp (đoạn thẳng đứng từ đỉnh tới tâm đáy).'),
        e('g8l38-e2', 'question', 'How many faces, edges, and vertices does a regular triangular pyramid have?', 'Hình chóp tam giác đều có bao nhiêu mặt, cạnh và đỉnh?'),
        e('g8l38-e3', 'present', 'It has $4$ triangular faces, $6$ edges, and $4$ vertices.', 'Nó có $4$ mặt tam giác, $6$ cạnh và $4$ đỉnh.'),
      ],
      [
        ex(
          'g8l38-ex1',
          'Lateral area and volume of a regular triangular pyramid',
          'Tính diện tích xung quanh và thể tích hình chóp tam giác đều',
          'A regular triangular pyramid has base edge $6\\text{ cm}$, base area $9\\sqrt{3}\\text{ cm}^2$, slant height $8\\text{ cm}$, and height $7\\text{ cm}$. Find $S_{\\text{lat}}$ and $V$.',
          'Hình chóp tam giác đều có cạnh đáy $6\\text{ cm}$, diện tích đáy $9\\sqrt{3}\\text{ cm}^2$, trung đoạn $8\\text{ cm}$, chiều cao $7\\text{ cm}$. Tính $S_{xq}$ và $V$.',
          [
            s('Step 1: Lateral surface area', 'Bước 1: Tính diện tích xung quanh', 'Semi-perimeter $p = \\frac{3 \\cdot 6}{2} = 9\\text{ cm}$; $S_{\\text{lat}} = 9 \\cdot 8 = 72\\text{ cm}^2$.', 'Nửa chu vi đáy $p = 9\\text{ cm} \\Rightarrow S_{xq} = 9 \\cdot 8 = 72\\text{ cm}^2$.'),
            s('Step 2: Volume', 'Bước 2: Tính thể tích', '$V = \\frac{1}{3} S_{\\text{base}} \\cdot h = \\frac{1}{3} \\cdot 9\\sqrt{3} \\cdot 7 = 21\\sqrt{3}\\text{ cm}^3$.', '$V = \\frac{1}{3} \\cdot 9\\sqrt{3} \\cdot 7 = 21\\sqrt{3}\\text{ cm}^3$.'),
          ],
          '$S_{\\text{lat}} = 72\\text{ cm}^2$ and $V = 21\\sqrt{3}\\text{ cm}^3$.',
          '$S_{xq} = 72\\text{ cm}^2$ và $V = 21\\sqrt{3}\\text{ cm}^3$.'
        ),
      ],
      ['Từ khóa đặc thù cực quan trọng của chương: `trung đoạn` = `slant height` ($d$), khác với `height` ($h$).']
    ),
    lesson(
      8, 10, 39,
      'Regular Quadrilateral Pyramids',
      'Hình chóp tứ giác đều',
      ['Identify the square base, four congruent isosceles-triangle lateral faces, slant height, and height of a regular quadrilateral pyramid.', 'Apply $S_{\\text{lat}} = p \\cdot d$ and $V = \\frac{1}{3} a^2 h$.'],
      ['Nhận biết đáy hình vuông, $4$ mặt bên tam giác cân bằng nhau, trung đoạn và chiều cao.', 'Vận dụng công thức $S_{xq} = p \\cdot d$ và $V = \\frac{1}{3} a^2 h$ vào bài toán thực tế.'],
      [
        v('g8l39-v1', 'regular quadrilateral pyramid / square-based pyramid', 'n phr', 'hình chóp tứ giác đều', 'A pyramid with a square base and four congruent isosceles-triangle lateral faces meeting at an apex above the square\'s center.', 'Hình chóp có mặt đáy là hình vuông và $4$ mặt bên là các tam giác cân bằng nhau.', 'The height $SO$ drops perpendicularly to the intersection $O$ of the square\'s diagonals.', 'Chiều cao $SO$ hạ vuông góc xuống giao điểm hai đường chéo hình vuông đáy.'),
      ],
      [
        n('g8l39-n1', 'S_{\\text{lat}} = 2ad, \\quad V = \\frac{1}{3}a^2h', 'for square base side a, lateral area is two a d and volume is one third a squared h', 'với đáy hình vuông cạnh a, diện tích xung quanh là 2ad và thể tích bằng 1 phần 3 a bình nhân h'),
      ],
      [
        e('g8l39-e1', 'describe', 'For a square base of side $a$, the total surface area is $S_{\\text{total}} = S_{\\text{lat}} + a^2$.', 'Diện tích toàn phần bằng diện tích xung quanh cộng thêm diện tích đáy hình vuông $a^2$.'),
        e('g8l39-e2', 'question', 'A tent shaped like a regular quadrilateral pyramid has base $4\\text{ m}$ and slant height $3\\text{ m}$. Find its lateral canvas area.', 'Lều trại hình chóp tứ giác đều có cạnh đáy $4\\text{ m}$, trung đoạn $3\\text{ m}$. Tính diện tích bạt phủ xung quanh.'),
        e('g8l39-e3', 'present', 'Half the perimeter is $p = 2 \\cdot 4 = 8\\text{ m}$, so $S_{\\text{lat}} = 8 \\cdot 3 = 24\\text{ m}^2$.', 'Nửa chu vi đáy $p = 8\\text{ m} \\Rightarrow S_{xq} = 8 \\cdot 3 = 24\\text{ m}^2$.'),
      ],
      [
        ex(
          'g8l39-ex1',
          'Total surface area and volume of a square pyramid',
          'Tính diện tích toàn phần và thể tích hình chóp tứ giác đều',
          'A regular square pyramid has base edge $a = 10\\text{ cm}$, pyramid height $h = 12\\text{ cm}$, and slant height $d = 13\\text{ cm}$. Find $S_{\\text{total}}$ and $V$.',
          'Hình chóp tứ giác đều có cạnh đáy $10\\text{ cm}$, chiều cao $12\\text{ cm}$, trung đoạn $13\\text{ cm}$. Tính $S_{tp}$ và $V$.',
          [
            s('Step 1: Lateral and total area', 'Bước 1: Tính $S_{xq}$ và $S_{tp}$', '$S_{\\text{lat}} = \\frac{4 \\cdot 10}{2} \\cdot 13 = 260\\text{ cm}^2$; $S_{\\text{total}} = 260 + 10^2 = 360\\text{ cm}^2$.', '$S_{xq} = 20 \\cdot 13 = 260\\text{ cm}^2$; $S_{tp} = 260 + 100 = 360\\text{ cm}^2$.'),
            s('Step 2: Volume', 'Bước 2: Tính thể tích', '$V = \\frac{1}{3} \\cdot 10^2 \\cdot 12 = 400\\text{ cm}^3$.', '$V = \\frac{1}{3} \\cdot 100 \\cdot 12 = 400\\text{ cm}^3$.'),
          ],
          '$S_{\\text{total}} = 360\\text{ cm}^2$ and $V = 400\\text{ cm}^3$.',
          '$S_{tp} = 360\\text{ cm}^2$ và $V = 400\\text{ cm}^3$.'
        ),
      ],
      ['Dùng bộ ba Pythagore $5$-$12$-$13$ trong hình chóp đáy cạnh $10\\text{ cm}$ rất hay gặp ($\\frac{a}{2} = 5, h = 12, d = 13$).']
    ),
  ]),
];
