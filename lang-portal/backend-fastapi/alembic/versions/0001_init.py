from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_init'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'words',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('japanese', sa.String, nullable=False),
        sa.Column('romaji', sa.String, nullable=False),
        sa.Column('english', sa.String, nullable=False),
        sa.Column('parts', sa.JSON, nullable=True),
    )
    op.create_table(
        'words_groups',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('word_id', sa.Integer, sa.ForeignKey('words.id'), nullable=False),
        sa.Column('group_id', sa.Integer, sa.ForeignKey('groups.id'), nullable=False),
    )
    op.create_table(
        'groups',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False),
    )
    op.create_table(
        'study_sessions',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('group_id', sa.Integer, sa.ForeignKey('groups.id'), nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=False),
        sa.Column('study_activity_id', sa.Integer, sa.ForeignKey('study_activities.id'), nullable=False),
    )
    op.create_table(
        'study_activities',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('study_session_id', sa.Integer, sa.ForeignKey('study_sessions.id'), nullable=False),
        sa.Column('group_id', sa.Integer, sa.ForeignKey('groups.id'), nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=False),
    )
    op.create_table(
        'word_review_items',
        sa.Column('word_id', sa.Integer, sa.ForeignKey('words.id'), primary_key=True),
        sa.Column('study_session_id', sa.Integer, sa.ForeignKey('study_sessions.id'), primary_key=True),
        sa.Column('correct', sa.Boolean, nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=False),
    )

def downgrade():
    op.drop_table('word_review_items')
    op.drop_table('study_activities')
    op.drop_table('study_sessions')
    op.drop_table('groups')
    op.drop_table('words_groups')
    op.drop_table('words')