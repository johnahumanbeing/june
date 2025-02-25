with open('traitors_list.txt', 'r') as file:
    lines = file.readlines()

html_cards = []
for line in lines:
    name, constituency = line.strip().split(',')
    card = f"""
<div class="traitor-card">
    <h3>{name.strip()}</h3>
    <p><strong>Role:</strong> MP</p>
    <p><strong>Actions:</strong> Voted for Finance Bill 2024</p>
    <p><strong>Constituency:</strong> {constituency.strip()}</p>
</div>
"""
    html_cards.append(card)

with open('traitors_cards.html', 'w') as output:
    output.write('\n'.join(html_cards))